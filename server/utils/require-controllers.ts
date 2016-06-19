import * as fs from 'fs'

/**
 * 引入路径下全部文件
 */
export default (path: string) => {
    const walk = function (path: string) {
        const files = fs.readdirSync(path)
        files.forEach(function (item) {
            var tmpPath = path + '/' + item,
                stats = fs.statSync(tmpPath)

            if (stats.isDirectory()) {
                walk(tmpPath)
            } else if (stats.isFile()) {
                require(tmpPath).default
            }
        })
    }
    walk(path)
}