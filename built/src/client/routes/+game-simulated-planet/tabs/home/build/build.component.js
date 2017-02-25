"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const typings = require("./build.type");
const dynamic_react_1 = require("../../../../../../../components/dynamic-react");
const timer_1 = require("../../../../../../../components/timer");
const game_simulated_planet_1 = require("../../../../../../common/game-simulated-planet");
const build_style_1 = require("./build.style");
const modal_1 = require("../../../../../../../components/modal");
let Build = class Build extends React.Component {
    constructor() {
        super(...arguments);
        this.state = new typings.State();
        this.handleClose = () => {
            this.setState({ show: false });
        };
        this.handleShow = () => {
            this.setState({ show: true });
        };
        this.colorfulText = (text, good) => {
            if (good) {
                return (React.createElement("span", { style: { color: 'green' } }, text));
            }
            return (React.createElement("span", { style: { color: 'red' } }, text));
        };
        this.handleBuild = (buildingName) => {
            this.props.GameSimulatedPlanetAction.building(this.props.GameSimulatedPlanetStore.currentPlanet.id, buildingName);
        };
    }
    render() {
        const BuildingList = game_simulated_planet_1.buildingList.map((buildingName, index) => {
            const buildingInfo = game_simulated_planet_1.buildings.get(buildingName);
            if (this.props.GameSimulatedPlanetStore.gameUser.progress < buildingInfo.progressNeed) {
                return null;
            }
            let buildCount = 0;
            this.props.GameSimulatedPlanetStore.currentPlanet.buildings.forEach(building => {
                if (building.type === buildingName) {
                    buildCount++;
                }
            });
            return (React.createElement(build_style_1.BuildingContainer, { key: index },
                React.createElement(build_style_1.BuildingTop, null,
                    React.createElement(build_style_1.BuildingTitle, null, buildingInfo.name),
                    React.createElement(build_style_1.BuildingCostContainer, null,
                        buildingInfo.data[0][0][0] > 0 &&
                            React.createElement(build_style_1.BuildingCostItemContainer, null,
                                React.createElement(build_style_1.BuildingCostTitle, null, "\u6676\u4F53\u77FF"),
                                React.createElement(build_style_1.BuildingCostValue, null, this.colorfulText(buildingInfo.data[0][0][0].toString(), this.props.GameSimulatedPlanetStore.currentPlanet.crystal >= buildingInfo.data[0][0][0]))),
                        buildingInfo.data[0][0][1] > 0 &&
                            React.createElement(build_style_1.BuildingCostItemContainer, null,
                                React.createElement(build_style_1.BuildingCostTitle, null, "\u74E6\u65AF"),
                                React.createElement(build_style_1.BuildingCostValue, null, this.colorfulText(buildingInfo.data[0][0][1].toString(), this.props.GameSimulatedPlanetStore.currentPlanet.gas >= buildingInfo.data[0][0][1]))),
                        React.createElement(build_style_1.BuildingCostItemContainer, null,
                            React.createElement(build_style_1.BuildingCostTitle, null, "\u8017\u65F6"),
                            React.createElement(build_style_1.BuildingCostValue, null,
                                React.createElement("span", { style: { color: 'green' } },
                                    " ",
                                    timer_1.friendlyMillisecond(buildingInfo.data[0][1][0])))),
                        React.createElement(build_style_1.BuildingCostItemContainer, null,
                            React.createElement(build_style_1.BuildingCostTitle, null, "\u5360\u5730"),
                            React.createElement(build_style_1.BuildingCostValue, null, this.colorfulText(buildingInfo.size.toString(), this.props.GameSimulatedPlanetStore.currentPlanet.size - this.props.GameSimulatedPlanetStore.currentPlanetBuiltSize >= buildingInfo.size))))),
                React.createElement(build_style_1.BuildingBottom, null,
                    React.createElement(build_style_1.BuildingDescription, null, buildingInfo.description),
                    React.createElement(build_style_1.BuildingButton, { onClick: this.handleBuild.bind(this, buildingName) },
                        buildCount,
                        " / ",
                        buildingInfo.limit,
                        " \u5EFA\u9020"))));
        });
        return (React.createElement(build_style_1.Container, { onClick: this.handleShow },
            React.createElement(modal_1.default, { show: this.state.show, onClose: this.handleClose, title: "建造" }, BuildingList),
            "\u5EFA\u9020"));
    }
};
Build.defaultProps = new typings.Props();
Build = __decorate([
    dynamic_react_1.Connect
], Build);
exports.default = Build;
//# sourceMappingURL=build.component.js.map