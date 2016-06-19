import './models'
import requireControllers from '../../utils/require-controllers'
import * as path from 'path'

requireControllers(path.join(__dirname, 'controllers'))