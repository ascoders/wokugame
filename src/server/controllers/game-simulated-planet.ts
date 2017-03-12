import * as express from 'express'
import { Repository } from 'typeorm'
import { Service } from 'typedi'
import GameUser from '../entitys/game-simulated-planet-user'
import GamePlanet from '../entitys/game-simulated-planet-planet'
import GameBuilding from '../entitys/game-simulated-planet-building'
import GameWarship from '../entitys/game-simulated-planet-warship'
import User from '../entitys/user'
import { OrmRepository } from 'typeorm-typedi-extensions'
import * as utils from '../../../components/node-utils'
import { tips } from '../../common/game-simulated-planet'
import {
    buildings,
    BuildingHelper,
    planetFresh,
    upgradeUserProgress,
    collectionInterval,
    collectionGainWithBuildingSupport
} from '../../common/game-simulated-planet'
import { division } from '../../../components/math'

// 服务器端是0时差
const buildingHelper = new BuildingHelper(0)

/**
 * vip1 立即完成 1 分钟以内事件
 * vip2 立即完成 3 分钟以内事件
 * vip3 立即完成 6 分钟以内事件
 * vip4 立即完成 10 分钟以内事件
 * vip5 立即完成 30 分钟以内事件
 *
 *
 */

@Service()
export default class GameSimulatedPlanet {

    @OrmRepository(User)
    private userRepository: Repository<User>

    @OrmRepository(GameUser)
    private gameUserRepository: Repository<GameUser>

    @OrmRepository(GamePlanet)
    private gamePlanetRepository: Repository<GamePlanet>

    @OrmRepository(GameBuilding)
    private gameBuildingRepository: Repository<GameBuilding>

    @OrmRepository(GameWarship)
    private gameWarshipRepository: Repository<GameWarship>

    /**
     * 获取包含游戏用户信息的用户
     */
    private getUser = async (req: express.Request, res: express.Response): Promise<User> => {
        if (!req.session['userId']) {
            throw Error('用户不存在')
        }

        // 查找用户的所有星球，已经每个星球上所有建筑
        const user = await this.userRepository.createQueryBuilder('user')
            .where('user.id=:id', { id: Number(req.session['userId']) })
            .leftJoinAndMapOne('user.gameSimulatedPlanetUser', GameUser, 'gameUser', 'gameUser.user=user.id')
            .leftJoinAndMapMany('gameUser.planets', GamePlanet, 'gamePlanet', 'gameUser.id=gamePlanet.gameUser')
            .leftJoinAndMapMany('gamePlanet.buildings', GameBuilding, 'gameBuilding', 'gamePlanet.id=gameBuilding.planet')
            .getOne()

        if (!user) {
            throw Error('用户不存在')
        }

        return user
    }

    /**
     * 刷新用户收益
     */
    private harvestUser = async (user: User, req: express.Request, res: express.Response): Promise<User> => {
        if (!user.gameSimulatedPlanetUser) {
            throw Error('游戏用户不存在')
        }

        const currentDate = new Date()

        // 刷新每个星球的状态
        user.gameSimulatedPlanetUser.planets.forEach(planet => {
            planetFresh(planet, user.gameSimulatedPlanetUser.lastHarvest.getTime(), 0)
        })

        // 更新计算收益的时间
        user.gameSimulatedPlanetUser.lastHarvest = currentDate

        return user
    }

    /**
     * 获取用户信息，同时刷新用户收益
     */
    private getAndHarvestUser = async (req: express.Request, res: express.Response): Promise<User> => {
        const user = await this.getUser(req, res)
        await this.harvestUser(user, req, res)
        return user
    }

    /**
     * 用户进度更新，同时保存用户信息
     */
    private upgradeUserProgressAndSave = async (user: User, req: express.Request, res: express.Response): Promise<User> => {
        // 更新用户进度
        upgradeUserProgress(user.gameSimulatedPlanetUser, buildingHelper)
        // 保存用户信息
        await this.gameUserRepository.persist(user.gameSimulatedPlanetUser)
        return user
    }

    /**
     * 设置用户可以达到新的进度，如果已经超过这个进度就不会处理
     */
    private setUserProgress = (gameUser: GameUser, progress: number) => {
        if (progress > gameUser.progress) {
            gameUser.progress = progress
        }
    }

    /**
     * 获取游戏用户信息
     * 如果还未创建用户，但已经登录，会自动创建游戏帐号
     */
    getAuthenticatedUser = async (req: express.Request, res: express.Response) => {
        const user = await this.getUser(req, res)

        if (!user.gameSimulatedPlanetUser) { // 游戏用户不存在
            // 创建游戏用户
            const gameUser = new GameUser()
            gameUser.user = user

            // 创建默认星球
            const gamePlanet = new GamePlanet()

            // 把星球给用户
            gameUser.planets.push(gamePlanet)

            await this.gameUserRepository.persist(gameUser)

            res.send({
                user: gameUser,
                currentTime: new Date().getTime()
            })
        } else { // 游戏用户存在
            await this.harvestUser(user, req, res)
            await this.upgradeUserProgressAndSave(user, req, res)

            res.send({
                user: user.gameSimulatedPlanetUser,
                currentTime: new Date().getTime()
            })
        }
    }

    /**
     * 用户手动点击采集
     */
    collection = async (req: express.Request, res: express.Response) => {
        const user = await this.getAndHarvestUser(req, res)
        const planet = user.gameSimulatedPlanetUser.planets.find(planet => planet.id === req.body.planetId)
        if (!planet) {
            throw Error('星球不存在')
        }

        if (planet.buildings.findIndex(building => building.type === 'autoDigger' && buildingHelper.getFinishedTime(building) > 0) > -1) {
            throw Error('已经存在自动收集机器')
        }

        if (new Date().getTime() < planet.lastCollection.getTime() + collectionInterval) {
            throw Error('还未到采集周期')
        }

        // 基础采集收益
        const { crystal, gas } = collectionGainWithBuildingSupport(planet, 0)

        planet.crystal += crystal
        planet.gas += gas

        planet.lastCollection = new Date()

        await this.upgradeUserProgressAndSave(user, req, res)

        res.send({ crystal, gas })
    }

    /**
     * 在星球建造建筑
     */
    building = async (req: express.Request, res: express.Response) => {
        const user = await this.getAndHarvestUser(req, res)
        const planet = user.gameSimulatedPlanetUser.planets.find(planet => planet.id === req.body.planetId)
        if (!planet) {
            throw Error('星球不存在')
        }

        // 查询建筑信息
        const buildingInfo = buildings.get(req.body.type.toString())

        if (!buildingInfo) {
            throw Error('不存在的建筑')
        }

        // 判断晶体矿是否足够建造一级建筑
        const cost = buildingHelper.getCostByInfo(buildingInfo, 1)
        if (planet.crystal < cost.crystal) {
            throw Error('晶体矿不足')
        }
        if (planet.gas < cost.gas) {
            throw Error('瓦斯不足')
        }

        // 判断建筑是否超过上限
        let thisBuildingAlreadyExistCount = 0
        planet.buildings.forEach(building => {
            if (building.type === req.body.type.toString()) {
                thisBuildingAlreadyExistCount++
            }
        })

        if (thisBuildingAlreadyExistCount >= buildingInfo.limit) {
            throw Error('不能再建造更多')
        }

        // 建造一个建筑
        const building = new GameBuilding()
        building.type = req.body.type

        // 把建筑给星球
        planet.buildings.push(building)

        // 星球资源减少
        planet.crystal -= cost.crystal
        planet.gas -= cost.gas

        await this.upgradeUserProgressAndSave(user, req, res)

        res.send(building)
    }

    /**
     * 拆除一个建筑在星球上
     */
    destroyBuilding = async (req: express.Request, res: express.Response) => {
        const user = await this.getAndHarvestUser(req, res)
        const planet = user.gameSimulatedPlanetUser.planets.find(planet => planet.id === Number(req.body.planetId))
        if (!planet) {
            throw Error('星球不存在')
        }

        // 查询建筑信息
        const building = planet.buildings.find(building => building.id === Number(req.params.buildingId))

        if (!building) {
            throw Error('不存在的建筑')
        }

        // 销毁这个建筑，oneToMany 类型不会自动删除，下面还需手动删除
        const buildingIndex = planet.buildings.indexOf(building)
        planet.buildings.splice(buildingIndex, 1)

        await this.gameBuildingRepository.remove(building)

        res.send(building)
    }

    /**
     * 升级一个建筑在星球上
     */
    upgradeBuilding = async (req: express.Request, res: express.Response) => {
        const user = await this.getAndHarvestUser(req, res)
        const planet = user.gameSimulatedPlanetUser.planets.find(planet => planet.id === Number(req.body.planetId))
        if (!planet) {
            throw Error('星球不存在')
        }

        // 查询建筑信息
        const building = planet.buildings.find(building => building.id === Number(req.params.buildingId))

        if (!building) {
            throw Error('不存在的建筑')
        }

        const buildingInfo = buildingHelper.getInfo(building)

        const finishedTime = buildingHelper.getFinishedTime(building)
        if (finishedTime <= 0) {
            throw Error('建筑还未完成建造/升级')
        }

        const nextLevelCost = buildingHelper.getCostByInfo(buildingInfo, building.level + 1)

        if (planet.crystal < nextLevelCost.crystal) {
            throw Error('晶体矿不足')
        }

        if (planet.gas < nextLevelCost.gas) {
            throw Error('瓦斯不足')
        }

        // 升级这个建筑
        building.level += 1
        building.buildStart = new Date()

        // 消耗
        planet.crystal -= nextLevelCost.crystal
        planet.gas -= nextLevelCost.gas

        await this.upgradeUserProgressAndSave(user, req, res)

        res.send(building)
    }

    /**
     * 设计战舰
     */
    designWarship = async (req: express.Request, res: express.Response) => {
        const user = await this.getAndHarvestUser(req, res)
        const planet = user.gameSimulatedPlanetUser.planets.find(planet => planet.id === Number(req.body.planetId))
        if (!planet) {
            throw Error('星球不存在')
        }

        // 找出一共创建了多少战舰设计图
        const warshipCount = await this.gameWarshipRepository.createQueryBuilder('warship')
            .where('warship.planetId=:planetId', { planetId: Number(req.body.planetId) })
            .getCount()

        if (warshipCount >= 30) {
            throw Error('该星球最多拥有30个设计图纸')
        }

        // 新建一个战舰设计图
        const warship = new GameWarship()
        warship.name = req.body.warship.name
        warship.key = req.body.warship.key
        warship.equipments = req.body.warship.equipments
        warship.planetId = planet.id

        await this.gameWarshipRepository.persist(warship)

        this.setUserProgress(user.gameSimulatedPlanetUser, 6)
        await this.upgradeUserProgressAndSave(user, req, res)

        res.send(true)
    }

    /**
     * 获得设计的战舰列表
     */
    getWarships = async (req: express.Request, res: express.Response) => {
        const user = await this.getAndHarvestUser(req, res)
        const planet = user.gameSimulatedPlanetUser.planets.find(planet => planet.id === Number(req.params.planetId))
        if (!planet) {
            throw Error('星球不存在')
        }

        const warships = await this.gameWarshipRepository.createQueryBuilder('warship')
            .where('warship.planetId=:planetId', { planetId: Number(req.params.planetId) })
            .getMany()

        res.send(warships)
    }

    /**
     * 删除设计图纸
     */
    deleteWarship = async (req: express.Request, res: express.Response) => {
        const user = await this.getAndHarvestUser(req, res)
        // 要删除的战舰设计图 id
        const warshipId = Number(req.body.warshipId)

        // 查找其信息
        const warship = await this.gameWarshipRepository.findOneById(warshipId)

        if (!warship) {
            throw Error('不存在的设计图')
        }

        // 必须属于用户的星球    
        if (!user.gameSimulatedPlanetUser.planets.some(planet => warship.planetId === planet.id)) {
            throw Error('这个设计图不属于你')
        }

        await this.gameWarshipRepository.remove(warship)

        res.send(true)
    }
}