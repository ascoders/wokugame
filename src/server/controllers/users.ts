import * as express from 'express'
import {Repository} from 'typeorm'
import {Service} from 'typedi'
import User from '../entitys/user'
import {OrmRepository} from 'typeorm-typedi-extensions'
import * as utils from '../../../components/node-utils'

@Service()
export default class Users {

    @OrmRepository(User)
    private userRepository: Repository<User>

    /**
     * 查询全体用户
     */
    findAndCountAll = async(req: express.Request, res: express.Response) => {
        const page = Number(req.body.page) || 1
        const total = Number(req.body.total) || 20

        if (page < 1) {
            return res.status(400).send({
                message: '参数 page 不能小于 1'
            })
        }

        if (total < 1 || total > 100) {
            return res.status(400).send({
                message: '参数 total 范围必须在 1 ~ 100 之间'
            })
        }

        const result = await this.userRepository
            .createQueryBuilder('user')
            .select(['user.id as user_id', 'user.nickname as user_nickname'])
            .setLimit(total)
            .setOffset(total * (page - 1))
            .getManyAndCount()

        res.send({
            rows: result[0],
            count: result[1]
        })
    }

    /**
     * 创建用户
     */
    create = async(req: express.Request, res: express.Response) => {
        const user = new User()
        user.nickname = req.body.nickname
        user.password = utils.md5(req.body.password)
        user.passwordRetry = 0

        const result = await this.userRepository.persist(user)

        // 用户不应看到自己的密码
        delete result.password
        res.send(result)
    }

    /**
     * 用户登录
     */
    login = async(req: express.Request, res: express.Response) => {
        const user = await this.userRepository
            .createQueryBuilder('user')
            .where(`user.nickname=:nickname`)
            .setParameters({
                nickname: req.body.nickname
            })
            .getOne()

        const retryCount = 9
        const waitTime = 60

        if (!user) {
            return res.status(404).send({
                message: '用户不存在'
            })
        }

        // 如果重试次数达到上限，不论密码是否正确都会终止判断
        if (user.passwordRetry === retryCount) {
            // 距离上次操作超过 1 分钟，会直接解锁
            if (new Date().getTime() - user.updated.getTime() >= waitTime * 1000) {
                user.passwordRetry = 0
                await this.userRepository.persist(user)
            } else {
                const remainingTime = waitTime - Math.floor((new Date().getTime() - user.updated.getTime()) / 1000)

                return res.status(403).send({
                    message: `密码重试次数达到上限，还需等待 ${remainingTime} 秒`
                })
            }
        }

        // 密码错误
        if (utils.md5(req.body.password) !== user.password) {
            user.passwordRetry++
            await this.userRepository.persist(user)

            if (user.passwordRetry < 4) {
                return res.status(403).send({
                    message: `密码错误`
                })
            } else {
                return res.status(403).send({
                    message: `密码错误，还有 ${retryCount + 1 - user.passwordRetry} 次重试机会，失败后登录将冻结 ${waitTime} 秒`
                })
            }
        } else {
            // 密码正确，重置机会
            user.passwordRetry = 0
            await this.userRepository.persist(user)
        }

        delete user.password
        res.send(user)
    }
}