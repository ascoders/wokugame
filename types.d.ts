declare module 'webpack-dev-server' {
    const api: any
    export = api
}

declare module 'koa-static-cache' {
    const api: any
    export = api
}

declare module 'happypack' {
    const api: any
    export = api
}

declare module 'graphql-server-koa' {
    const graphqlKoa: any
    export {
        graphqlKoa
    }
}

declare namespace Webpack {
    export const DllReferencePlugin: any
}