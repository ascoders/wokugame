"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const typings = require("./home.type");
const dynamic_react_1 = require("../../../../../../components/dynamic-react");
const home_style_1 = require("./home.style");
const tabs_1 = require("../../../../../../components/tabs");
const building_component_1 = require("./building/building.component");
const warship_component_1 = require("./warship/warship.component");
exports.default = dynamic_react_1.Connect((props = new typings.Props()) => {
    if (!props.GameSimulatedPlanetStore.currentPlanet) {
        return null;
    }
    return (React.createElement(home_style_1.Container, null,
        React.createElement(home_style_1.HeaderContainer, null,
            React.createElement(home_style_1.HeaderInformationContainer, null,
                React.createElement(home_style_1.HeaderInformationItem, null,
                    "\u6676\u4F53\u77FF\u50A8\u91CF ",
                    Math.floor(props.GameSimulatedPlanetStore.currentPlanet.crystal)),
                React.createElement(home_style_1.HeaderInformationItem, null,
                    "\u74E6\u65AF\u50A8\u91CF ",
                    Math.floor(props.GameSimulatedPlanetStore.currentPlanet.gas)),
                React.createElement(home_style_1.HeaderInformationItem, null,
                    "\u603B\u4EBA\u53E3 ",
                    Math.floor(props.GameSimulatedPlanetStore.currentPlanet.population),
                    "\u00A0/ ",
                    props.GameSimulatedPlanetStore.currentPlanetPopulationLimit),
                React.createElement(home_style_1.HeaderInformationItem, null,
                    "\u5EFA\u7B51\u7A7A\u95F4 ",
                    props.GameSimulatedPlanetStore.currentPlanetBuiltSize,
                    "\u00A0/ ",
                    props.GameSimulatedPlanetStore.currentPlanet.size)),
            React.createElement(home_style_1.HeaderOperationContainer, null)),
        React.createElement(home_style_1.MainContainer, null,
            React.createElement(tabs_1.Tabs, null,
                React.createElement(tabs_1.TabPane, { title: "建筑" },
                    React.createElement(building_component_1.default, null)),
                props.GameSimulatedPlanetStore.gameUser.progress > 4 &&
                    React.createElement(tabs_1.TabPane, { title: "舰队" },
                        React.createElement(warship_component_1.default, null)),
                props.GameSimulatedPlanetStore.gameUser.progress > 10 &&
                    React.createElement(tabs_1.TabPane, { title: "科技" })))));
});
//# sourceMappingURL=home.component.js.map