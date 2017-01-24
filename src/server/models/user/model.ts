import * as Sequelize from 'sequelize'

export default (sequelize: Sequelize.Sequelize) => {
    return sequelize.define('user', {
        /**
         * 用户昵称，全局唯一，必须设置
         */
        nickname: {
            type: Sequelize.STRING(10),
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true,
                len: [2, 10]
            }
        },
        /**
         * 密码
         * 如果通过第三方注册，那么密码默认为空
         */
        password: {
            type: Sequelize.STRING(32),
            allowNull: true,
            validate: {
                len: [32, 32]
            }
        },
        /**
         * 密码尝试次数
         * 最大次数 9
         */
        passwordRetry: {
            type: Sequelize.INTEGER(1).UNSIGNED,
            defaultValue: 0,
            validate: {
                min: 0,
                max: 9
            }
        },
        /**
         * 通过邮箱注册的用户拥有
         */
        email: {
            type: Sequelize.STRING(30),
            allowNull: true,
            validate: {
                len: [4, 30]
            }
        }
    }, {
        freezeTableName: true // Model tableName will be the same as the model name
    })
}