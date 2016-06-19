import * as fs from 'fs'

/**
 * 找到路径下全部 index.js
 * 只找最多一层
 */
export default (path: string) => {
    const walk = function (path: string, deep: number) {
        const files = fs.readdirSync(path)
        files.forEach(function (item) {
            var tmpPath = path + '/' + item,
                stats = fs.statSync(tmpPath)

            if (stats.isDirectory() && deep !== 1) {
                walk(tmpPath, 1)
            } else if (stats.isFile()) {
                // 只记录 index.js
                if (item === 'index.js') {
                    require(tmpPath).default
                }
            }
        })
    }
    walk(path, 0)
}