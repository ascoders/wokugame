"use strict";
const fit_isomorphic_redux_tools_1 = require('fit-isomorphic-redux-tools');
exports.SIMPLE_GET_FUNCTION = 'SIMPLE_GET_FUNCTION';
exports.SIMPLE_POST_FUNCTION = 'SIMPLE_POST_FUNCTION';
exports.simpleGet = () => {
    return fit_isomorphic_redux_tools_1.fetch({
        type: exports.SIMPLE_GET_FUNCTION,
        url: '/api/simple-get-function',
        params: {
            name: 'huangziyi'
        },
        method: 'get'
    });
};
exports.simplePost = () => {
    return fit_isomorphic_redux_tools_1.fetch({
        type: exports.SIMPLE_POST_FUNCTION,
        url: '/api/simple-post-function',
        data: {
            name: 'who are you?'
        },
        method: 'post'
    });
};
