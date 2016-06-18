import sequelize from './connect'
import './member/schema'

sequelize.sync()