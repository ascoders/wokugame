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
    const connect: <T>(mapStateToProps?: (state?: T) => any) => any
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