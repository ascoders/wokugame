"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const typings = require("./game-simulated-planet.type");
const dynamic_react_1 = require("../../../../components/dynamic-react");
const timer_1 = require("../../../../components/timer");
const game_simulated_planet_1 = require("../../../common/game-simulated-planet");
const game_simulated_planet_style_1 = require("./game-simulated-planet.style");
const home_component_1 = require("./tabs/home/home.component");
let GameSimulatedPlanetScene = class GameSimulatedPlanetScene extends React.Component {
    constructor() {
        super(...arguments);
        this.componentWillMount = () => __awaiter(this, void 0, void 0, function* () {
            yield this.props.actions.GameSimulatedPlanetAction.loginAuthenticatedUser();
            this.interval = new timer_1.Interval(() => {
                this.props.actions.GameSimulatedPlanetAction.freshCurrentPlanet();
            }, 1000);
        });
    }
    componentWillUnmount() {
        this.interval.stop();
    }
    render() {
        if (this.props.gameUserProcess === undefined) {
            return null;
        }
        return (React.createElement(game_simulated_planet_style_1.GridContainer, null,
            React.createElement(game_simulated_planet_style_1.Header, null),
            this.props.gameUserProcess >= 1 &&
                React.createElement(game_simulated_planet_style_1.Sidebar, null,
                    React.createElement(game_simulated_planet_style_1.SidebarMenuItem, { theme: { active: true } }, "\u5BB6\u56ED")),
            React.createElement(game_simulated_planet_style_1.Main, null,
                React.createElement(home_component_1.default, null)),
            React.createElement(game_simulated_planet_style_1.Footer, null, game_simulated_planet_1.tips.get(this.props.gameUserProcess))));
    }
};
GameSimulatedPlanetScene.defaultProps = new typings.Props();
GameSimulatedPlanetScene = __decorate([
    dynamic_react_1.Connect(state => {
        return {
            gameUserProcess: state.GameSimulatedPlanetStore.gameUser && state.GameSimulatedPlanetStore.gameUser.progress
        };
    })
], GameSimulatedPlanetScene);
exports.default = GameSimulatedPlanetScene;
//# sourceMappingURL=game-simulated-planet.component.js.map