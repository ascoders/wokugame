"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redux_component_1 = require("../../redux-component");
class Props extends redux_component_1.default {
    constructor() {
        super(...arguments);
        this.show = false;
        this.title = null;
        this.backdropClickToClose = true;
        this.onClose = () => {
        };
    }
}
exports.Props = Props;
class State {
}
exports.State = State;
//# sourceMappingURL=modal.type.js.map