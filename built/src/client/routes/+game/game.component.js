"use strict";
const React = require("react");
const index_1 = require("./game/index");
class GameScene extends React.Component {
    componentDidMount() {
        this.game = new index_1.default(document.getElementById('game-container'));
    }
    componentWillUnmount() {
        this.game.destroy();
    }
    render() {
        console.log('render');
        return (React.createElement("div", { id: "game-container" }));
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GameScene;
//# sourceMappingURL=game.component.js.map