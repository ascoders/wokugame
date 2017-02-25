"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dependency_inject_1 = require("../../../components/dependency-inject");
const action_1 = require("./user/action");
const action_2 = require("./login-page/action");
const action_3 = require("./register-page/action");
const action_4 = require("./game-simulated-planet/action");
const action_5 = require("./application/action");
const store_1 = require("./user/store");
const store_2 = require("./login-page/store");
const store_3 = require("./register-page/store");
const store_4 = require("./game-simulated-planet/store");
const store_5 = require("./application/store");
const container = new dependency_inject_1.Container();
container.set(action_1.default, new action_1.default());
container.set(action_2.default, new action_2.default());
container.set(action_3.default, new action_3.default());
container.set(action_4.default, new action_4.default());
container.set(action_5.default, new action_5.default());
container.set(store_1.default, new store_1.default());
container.set(store_2.default, new store_2.default());
container.set(store_3.default, new store_3.default());
container.set(store_4.default, new store_4.default());
container.set(store_5.default, new store_5.default());
class StoreProps {
    constructor() {
        this.UserAction = container.get(action_1.default);
        this.LoginPageAction = container.get(action_2.default);
        this.RegisterPageAction = container.get(action_3.default);
        this.GameSimulatedPlanetAction = container.get(action_4.default);
        this.ApplicationAction = container.get(action_5.default);
        this.UserStore = container.get(store_1.default);
        this.LoginPageStore = container.get(store_2.default);
        this.RegisterPageStore = container.get(store_3.default);
        this.GameSimulatedPlanetStore = container.get(store_4.default);
        this.ApplicationStore = container.get(store_5.default);
    }
}
exports.default = StoreProps;
//# sourceMappingURL=index.js.map