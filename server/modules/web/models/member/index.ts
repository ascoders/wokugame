// // 用户密码是否正确（以及账户状态判断）
// func (this *Model) Authentication(account string, password string) (*Data, error) {
//     fmt.Println("Authentication,account", account)
//     userData, userDataError := this.GetByAccount(account)
//     if userDataError != nil {
//         return nil, errors.New("账号不存在")
//     }
//
//     // 账户锁定情况
//     if time.Now().Before(userData.StopTime) {
//         long := userData.StopTime.Sub(time.Now())
//         return nil, errors.New("账号距离解锁还有 " + strconv.FormatFloat(long.Seconds(), 'f', 0, 64) + " 秒")
//     }
//
//     // 校验密码
//     if userData.Password != EncodePassword(password) {
//         if userData.ErrorChance == 1 {
//             // 如果尽验证机会，账号锁定10分钟
//             minute := time.Duration(10) * time.Minute
//             this.UpdateMap(userData.Id, map[string]interface{}{
//                 "error_chance": 6,
//                     "stop_time":    time.Now().Add(minute),
//             })
//             return nil, errors.New("为保障安全，您的账号在10分钟后解除锁定状态")
//         } else {
//             if userData.ErrorChance == 0 {
//                 // 默认错误机会为0，重新把错误机会设置为5
//                 userData.ErrorChance = 5
//                 this.UpdateMap(userData.Id, map[string]interface{}{
//                     "error_chance": userData.ErrorChance,
//                 })
//             } else {
//                 // 验证机会减少1次
//                 userData.ErrorChance--
//                 this.UpdateMap(userData.Id, map[string]interface{}{
//                     "error_chance": userData.ErrorChance,
//                 })
//             }
//             return nil, errors.New("密码错误，您还有 " + strconv.Itoa(int(userData.ErrorChance)) + " 次机会")
//         }
//     }
//
//     // 更新最后登陆时间和登陆次数
//     userData.LastLogin = time.Now()
//     userData.LoginCount++
//
//     // 更新密码错误次数
//     userData.ErrorChance = 6
//
//     if err := this.UpdateMap(userData.Id, map[string]interface{}{
//         "last_login":   userData.LastLogin,
//             "login_count":  userData.LoginCount,
//             "error_chance": userData.ErrorChance,
//     }); err != nil {
//         return nil, errors.New("用户信息更新失败")
//     }
//
//     return userData, nil
// }

import * as validator from 'validator'
import model from './schema'

/**
 * 用户登录验证
 */
export const authentication = (account: string, password: string)=> {

}

/**
 * 根据帐号查询用户
 */
export const FindByAccount = async(account: string)=> {
    /**
     * 优先查找邮箱
     */
    if (validator.isEmail(account)) {
        const emailResult = await model.findOne({
            where: {
                email: account
            }
        })
        console.log(emailResult)
    }

    /**
     * 查找昵称
     */
    return await model.findOne({
        where: {
            nickname: account
        }
    })
    // userData := &Data{}
    //
    // if err := as.Lib.Valid.Email(account); err == nil {
    //     // 根据邮箱查找用户
    //     userData, err = this.GetByEmail(account)
    //     if err != nil {
    //         return nil, errors.New("账号不存在")
    //     }
    // } else {
    //     // 根据用户名查找用户
    //     userData, err = this.GetByNickname(account)
    //     if err != nil {
    //         return nil, errors.New("帐号不存在")
    //     }
    // }
    //
    // return userData, nil
}