"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    namespace: 'pageRegister',
    defaultState: {
        nickname: '',
        password: ''
    },
    reducers: {
        updateNickname: (state, action) => {
            return state.setIn(['nickname'], action.payload);
        },
        updatePassword: (state, action) => {
            return state.setIn(['password'], action.payload);
        }
    }
};
//# sourceMappingURL=index.js.map