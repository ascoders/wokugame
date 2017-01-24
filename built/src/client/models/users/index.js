"use strict";
const services_1 = require("../../services");
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    namespace: 'user',
    defaultState: {},
    reducers: {
        create: (state, action) => {
            services_1.UsersService.create({
                nickname: action.payload.nickname,
                password: action.payload.password
            });
            return state;
        }
    }
};
//# sourceMappingURL=index.js.map