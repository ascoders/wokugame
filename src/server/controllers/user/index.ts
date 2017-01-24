import * as express from 'express'
import {User} from '../../models'

import * as utils from '../../../../components/node-utils'

const router = express.Router()
const wrap = (fn: express.RequestHandler) => (...args: any[]) => (<any>fn)(...args).catch(args[2])
router.route('/users')
/**
 * 查询全体用户
 */
    .get(async(req, res) => {
        const result = await User.findAndCountAll({
            offset: 0,
            limit: 20
        })
        res.send(result)
    })
    /**
     * 创建新用户
     */
    .post(wrap(async(req, res) => {
        const result = await User.create({
            nickname: req.body.nickname,
            password: utils.md5(req.body.password)
        })
        res.send(result)
    }))

export default router