"use strict";
const initialState = {
    height: 46
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (state = initialState, action) => {
    switch (action.type) {
        case 'setHeight':
            return Object.assign({}, state, {
                height: action.payload
            });
        default:
            return state;
    }
};
//# sourceMappingURL=index.js.map