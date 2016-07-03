var through = require('through2')
var pp = require('preprocess')

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

        // 将 ./index.tsx 替换为 webpack 热更新地址
        content = content.replace(`src="/static/bundle/main.bundle.js"`, `src="http://localhost:8090/index.js"`)

        file.contents = new Buffer(content)

        this.push(file)

        cb()
    })
}