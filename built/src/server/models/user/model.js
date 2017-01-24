"use strict";
const Sequelize = require("sequelize");
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (sequelize) => {
    return sequelize.define('user', {
        nickname: {
            type: Sequelize.STRING(10),
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true,
                len: [2, 10]
            }
        },
        password: {
            type: Sequelize.STRING(32),
            allowNull: true,
            validate: {
                len: [32, 32]
            }
        },
        passwordRetry: {
            type: Sequelize.INTEGER(1).UNSIGNED,
            defaultValue: 0,
            validate: {
                min: 0,
                max: 9
            }
        },
        email: {
            type: Sequelize.STRING(30),
            allowNull: true,
            validate: {
                len: [4, 30]
            }
        }
    }, {
        freezeTableName: true
    });
};
//# sourceMappingURL=model.js.map