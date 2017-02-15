import * as express from 'express'
import {Repository} from 'typeorm'
import {Service} from 'typedi'
import GameUser from '../entitys/game-simulated-planet-user'
import GamePlanet from '../entitys/game-simulated-planet-planet'
import GameBuilding from '../entitys/game-simulated-planet-building'
import User from '../entitys/user'
import {OrmRepository} from 'typeorm-typedi-extensions'
import * as utils from '../../../components/node-utils'
import {tips} from '../../common/game-simulated-planet'
import {buildings, BuildingHelper, planetFresh, upgradeUserProgress} from '../../common/game-simulated-planet'
import {division} from '../../../components/math'

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

    /**
     * 获取包含游戏用户信息的用户
     */
    private getUser = async(req: express.Request, res: express.Response): Promise<User> => {
        if (!req.session['userId']) {
            throw Error('用户不存在')
        }

        // 查找用户的所有星球，已经每个星球上所有建筑
        const user = await this.userRepository.createQueryBuilder('user')
            .where('user.id=:id', {id: Number(req.session['userId'])})
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
    private harvestUser = async(user: User, req: express.Request, res: express.Response): Promise<User> => {
        if (!user.gameSimulatedPlanetUser) {
            throw Error('游戏用户不存在')
        }

        const currentDate = new Date()

        // 刷新每个星球的状态
        user.gameSimulatedPlanetUser.planets = user.gameSimulatedPlanetUser.planets.map(planet => {
            return planetFresh(planet, user.gameSimulatedPlanetUser.lastHarvest.getTime(), 0).planet
        })

        // 更新计算收益的时间
        user.gameSimulatedPlanetUser.lastHarvest = currentDate

        return user
    }

    /**
     * 获取用户信息，同时刷新用户收益
     */
    private getAndHarvestUser = async(req: express.Request, res: express.Response): Promise<User> => {
        const user = await this.getUser(req, res)
        await this.harvestUser(user, req, res)
        return user
    }

    /**
     * 用户进度更新，同时保存用户信息
     */
    private upgradeUserProgressAndSave = async(user: User, req: express.Request, res: express.Response): Promise<User> => {
        // 更新用户进度
        upgradeUserProgress(user.gameSimulatedPlanetUser, buildingHelper)
        // 保存用户信息
        await this.gameUserRepository.persist(user.gameSimulatedPlanetUser)
        return user
    }

    /**
     * 获取游戏用户信息
     * 如果还未创建用户，但已经登录，会自动创建游戏帐号
     */
    getAuthenticatedUser = async(req: express.Request, res: express.Response) => {
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
     * 在星球建造建筑
     */
    building = async(req: express.Request, res: express.Response) => {
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
        const buildingCost = buildingInfo.data[0][0][0]
        if (planet.crystal < buildingCost) {
            throw Error('晶体矿不足')
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
        planet.crystal -= buildingCost

        await this.upgradeUserProgressAndSave(user, req, res)

        res.send(building)
    }

    /**
     * 拆除一个建筑在星球上
     */
    destroyBuilding = async(req: express.Request, res: express.Response) => {
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
    upgradeBuilding = async(req: express.Request, res: express.Response) => {
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

        if (planet.crystal < nextLevelCost) {
            throw Error('晶体矿不足')
        }

        // 升级这个建筑
        building.level += 1
        building.buildStart = new Date()

        // 消耗星球金币
        planet.crystal -= nextLevelCost

        await this.upgradeUserProgressAndSave(user, req, res)

        res.send(building)
    }
}