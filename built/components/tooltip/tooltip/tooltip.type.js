"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Props {
    constructor() {
        this.title = 'toolTip';
        this.zIndex = 102;
        this.shadowZIndex = 101;
        this.position = 'top';
        this.type = 'hover';
        this.showShadow = false;
        this.simple = false;
    }
}
exports.Props = Props;
class State {
    constructor() {
        this.childrenTop = 0;
        this.childrenLeft = 0;
        this.childrenWidth = 0;
        this.childrenHeight = 0;
        this.tooltipWidth = 0;
        this.tooltipHeight = 0;
        this.show = false;
    }
}
exports.State = State;
//# sourceMappingURL=tooltip.type.js.map