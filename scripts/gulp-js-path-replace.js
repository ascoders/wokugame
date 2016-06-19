var through = require('through2')
var pp = require('preprocess')
var path = require('path')

/**
 * 将 html 的 _namespace 转换为对应路径传过去
 * @param options 路径前缀名
 */
module.exports = function (options) {
    return through.obj(function (file, enc, cb) {
        if (file.isNull()) {
            this.push(file)
            return cb()
        }

        if (file.isStream()) {
            this.emit('error', new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'))
            return cb()
        }

        var content = pp.preprocess(file.contents.toString(), options || {})

        // 去除 base path
        let filePath = file.path
        filePath = filePath.replace(file.base, '')

        // 获得去除最后文件名的相对路径,如果是空表示是相对根目录
        const relativePathArray = filePath.split('/')
        relativePathArray.pop()
        const relativePath = relativePathArray.join('/')

        // 带前缀的路径名
        const relativePathWithPrefix = path.join(options, relativePath)

        /**
         * 生成 namespace
         */
        // 把所有 - 转换为 _
        let namespace = relativePathWithPrefix.replace(/-/g, '_')
        // 把所有 / 转换为 -
        namespace = namespace.replace(/\//g, '-')

        // 处理非根路径
        if (relativePath !== '') {
            content = content.replace(/_namespace/g, namespace)
        }

        file.contents = new Buffer(content)

        this.push(file)

        cb()
    })
}