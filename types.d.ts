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

declare module 'react-redux' {
    const connect: <T, P>(mapStateToProps?: (state?: T, props?: P) => any, mapDispatchToProps?: (dispatch?: any) => any) => any
    const Provider: any
    export {
        connect,
        Provider
    }
}

declare module 'gulp-cached' {
    const api: any
    export = api
}

declare module 'github-webhook-handler' {
    const api: any
    export = api
}

declare module 'http-proxy' {
    const api: any
    export = api
}

declare module 'autoprefixer' {
    const api: any
    export = api
}

declare module 'http2' {
    const api: any
    export = api
}

declare module 'webpack' {
    const api: any
    export = api
}