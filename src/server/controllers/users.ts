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
        if (!req.body.password) {
            return res.status(400).send({
                message: '必须设置密码'
            })
        }

        if (req.body.password.length < 5) {
            return res.status(400).send({
                message: '密码长度不能小于 5'
            })
        }

        const user = new User()
        user.nickname = req.body.nickname
        user.password = utils.md5(req.body.password)
        user.passwordRetry = 0

        const result = await this.userRepository.persist(user)

        // 注册成功，设置 session
        req.session['userId'] = user.id

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

        // 登录成功，设置 session
        req.session['userId'] = user.id

        delete user.password
        res.send(user)
    }

    /**
     * 获取当前登录用户信息
     */
    getAuthenticatedUser = async(req: express.Request, res: express.Response) => {
        if (!req.session['userId']) {
            return res.status(404).send({
                message: '用户不存在'
            })
        }

        const user = await this.userRepository.findOneById(req.session['userId'])

        if (!user) {
            // session 中存储的用户不存在，可能用户被删除了
            return res.status(404).send({
                message: '用户不存在'
            })
        }

        res.send(user)
    }

    /**
     * 注销当前登录用户
     */
    deleteAuthenticatedUser = async(req: express.Request, res: express.Response) => {
        await req.session.destroy(null)
        res.send(true)
    }
}