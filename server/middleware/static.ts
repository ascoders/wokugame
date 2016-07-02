import * as path from 'path'
import * as staticCache from 'koa-static-cache'

export default ()=> {
    return staticCache('output/static', {
        /**
         * 静态资源前缀
         */
        prefix: '/static',

        /**
         * 缓存有效时间
         */
        maxAge: 365 * 24 * 60 * 60,

        /**
         * 放在 memory 缓存中
         */
        buffer: true,

        /**
         * 如果客户端支持,用 gzip
         */
        gzip: true,
        usePrecompiledGzip: true
    })
}