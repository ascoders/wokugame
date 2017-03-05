"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const typings = require("./collection.type");
const timer_1 = require("../../../../../../../../components/timer");
const dynamic_react_1 = require("../../../../../../../../components/dynamic-react");
const game_simulated_planet_1 = require("../../../../../../../common/game-simulated-planet");
const collection_style_1 = require("./collection.style");
let Build = class Build extends React.Component {
    constructor() {
        super(...arguments);
        this.state = new typings.State();
        this.handleClick = () => {
            if (this.state.progress !== 100) {
                return;
            }
            this.props.GameSimulatedPlanetAction.collection(this.props.GameSimulatedPlanetStore.currentPlanet.id);
        };
    }
    componentWillMount() {
        this.interval = new timer_1.Interval(() => {
            const nowTime = new Date().getTime();
            const lastCollectionTime = new Date(this.props.GameSimulatedPlanetStore.currentPlanet.lastCollection).getTime();
            if (nowTime - lastCollectionTime > game_simulated_planet_1.collectionInterval) {
                this.setState({
                    progress: 100
                });
            }
            else {
                this.setState({
                    progress: (nowTime - lastCollectionTime) / game_simulated_planet_1.collectionInterval * 100
                });
            }
        }, 200);
    }
    componentWillUnmount() {
        this.interval.stop();
    }
    render() {
        return (React.createElement(collection_style_1.Container, { onClick: this.handleClick, theme: { disabled: this.state.progress !== 100 } },
            React.createElement(collection_style_1.Text, { theme: { disabled: this.state.progress !== 100 } }, "\u91C7\u96C6"),
            this.state.progress !== 100 &&
                React.createElement(collection_style_1.Progress, { style: { width: `${this.state.progress}%` } })));
    }
};
Build.defaultProps = new typings.Props();
Build = __decorate([
    dynamic_react_1.Connect
], Build);
exports.default = Build;
//# sourceMappingURL=collection.component.js.map