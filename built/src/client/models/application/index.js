"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    namespace: 'application',
    defaultState: {
        navbarHeight: 46
    },
    reducers: {
        changeHeaderColor: (state, action) => {
            return state.setIn(['navbarHeight'], action.payload);
        }
    }
};
//# sourceMappingURL=index.js.map