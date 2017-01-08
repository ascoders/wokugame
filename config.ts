// 本地 server 端口号
export const localPort = 8080

// 本地 dev 模式 webpack 文件服务端口号
export const localWebpackPort = 9091

// 部署端口号，监听 push 信息
export const deployPort = 3000

// 静态资源路径前缀
export const publicPath = 'static'

export const webpackDlls = [
    /** 基础库 */
    'react',
    'react-dom',
    'react-router',
    'react-router-redux',
    'redux',

    /** 工具库 */
    'lodash',
    'classnames',
    'seamless-immutable',
    'rxjs',

    /** 额外 */
    // 'pixi.js'
]

// 发布静态资源路径前缀
export const staticPathPrefixProduction = '/'