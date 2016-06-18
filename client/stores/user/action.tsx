import {fetch} from 'fit-isomorphic-redux-tools'

export const SIMPLE_GET_FUNCTION = 'SIMPLE_GET_FUNCTION'
export const SIMPLE_POST_FUNCTION = 'SIMPLE_POST_FUNCTION'

export const simpleGet = ()=> {
    return fetch({
        type: SIMPLE_GET_FUNCTION,
        url: '/api/simple-get-function',
        params: {
            name: 'huangziyi'
        },
        method: 'get'
    })
}

export const simplePost = ()=> {
    return fetch({
        type: SIMPLE_POST_FUNCTION,
        url: '/api/simple-post-function',
        data: {
            name: 'who are you?'
        },
        method: 'post'
    })
}