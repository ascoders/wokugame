"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    namespace: 'application',
    defaultState: {
        headerColor: 'red'
    },
    reducers: {
        changeHeaderColor: (state, action) => {
            return state.setIn(['headerColor'], action.payload);
        }
    }
};
//# sourceMappingURL=application.js.map