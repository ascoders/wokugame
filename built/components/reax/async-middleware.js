"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isPromise(val) {
    return val && typeof val.then === 'function';
}
exports.default = ({ dispatch }) => (next) => (action) => {
    if (action) {
        isPromise(action)
            ? action.then((res) => dispatch(res))
            : next(action);
    }
};
//# sourceMappingURL=async-middleware.js.map