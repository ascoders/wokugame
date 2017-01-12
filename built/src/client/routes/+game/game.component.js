"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const React = require("react");
const index_1 = require("../../../../frame/index");
const styles = require('./game.css');
const index_2 = require("./game/index");
let GameScene = class GameScene extends React.Component {
    componentDidMount() {
        this.game = new index_2.default(document.getElementById('game-container'));
    }
    componentWillUnmount() {
        this.game.destroy();
    }
    render() {
        return (React.createElement("div", { id: "game-container" }));
    }
};
GameScene = __decorate([
    index_1.connect(state => {
        return {};
    }),
    __metadata("design:paramtypes", [])
], GameScene);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GameScene;
//# sourceMappingURL=game.component.js.map