module.exports = conf

var conf = {
    // 项目名
    modName: 'home',

    // 可选： gbk 、utf8
    charset: 'utf8',

    // 远程开发机地址
    host: '',

    // 开发机端口
    port: 8080,

    // yog2 监听端口(上传文件)
    receiverStaticPort: 8080
}

/************ 启用 tb fis3 预设配置 ************/
fis.require.prefixes.unshift('fit')
fis.require('isomorphic-build')(fis, conf)

/************ 自定义配置部分 ************/
