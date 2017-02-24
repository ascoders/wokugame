"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const typings = require("./home.type");
const dynamic_react_1 = require("../../../../../../components/dynamic-react");
const game_simulated_planet_1 = require("../../../../../common/game-simulated-planet");
const home_style_1 = require("./home.style");
const tabs_1 = require("../../../../../../components/tabs");
const building_card_component_1 = require("../../components/building-card/building-card.component");
const build_component_1 = require("./build/build.component");
const collection_component_1 = require("./collection/collection.component");
exports.default = dynamic_react_1.Connect(state => {
    const currentPlanet = state.GameSimulatedPlanetStore.gameUser.planets[state.GameSimulatedPlanetStore.currentPlanetIndex];
    return {
        progress: state.GameSimulatedPlanetStore.gameUser.progress,
        currentPlanet,
        currentPlanetPopulationLimit: state.GameSimulatedPlanetStore.currentPlanetPopulationLimit,
        currentPlanetBuiltSize: state.GameSimulatedPlanetStore.currentPlanetBuiltSize
    };
})((props = new typings.Props()) => {
    if (!props.currentPlanet) {
        return null;
    }
    const BuildingCards = props.currentPlanet.buildings.sort((left, right) => {
        if (left.type === right.type) {
            if (right.level == left.level) {
                return new Date(right.buildStart).getTime() - new Date(left.buildStart).getTime();
            }
            return right.level - left.level;
        }
        return game_simulated_planet_1.buildingList.findIndex(name => name === right.type) - game_simulated_planet_1.buildingList.findIndex(name => name === left.type);
    }).map((building, index) => {
        return (React.createElement(building_card_component_1.default, { key: building.id, buildingId: building.id }));
    });
    return (React.createElement(home_style_1.Container, null,
        React.createElement(home_style_1.HeaderContainer, null,
            React.createElement(home_style_1.HeaderInformationContainer, null,
                React.createElement(home_style_1.HeaderInformationItem, null,
                    "\u6676\u4F53\u77FF\u50A8\u91CF ",
                    Math.floor(props.currentPlanet.crystal)),
                React.createElement(home_style_1.HeaderInformationItem, null,
                    "\u74E6\u65AF\u50A8\u91CF ",
                    Math.floor(props.currentPlanet.gas)),
                React.createElement(home_style_1.HeaderInformationItem, null,
                    "\u603B\u4EBA\u53E3 ",
                    Math.floor(props.currentPlanet.population),
                    "\u00A0/ ",
                    props.currentPlanetPopulationLimit),
                React.createElement(home_style_1.HeaderInformationItem, null,
                    "\u5EFA\u7B51\u7A7A\u95F4 ",
                    props.currentPlanetBuiltSize,
                    "\u00A0/ ",
                    props.currentPlanet.size)),
            React.createElement(home_style_1.HeaderOperationContainer, null)),
        React.createElement(home_style_1.MainContainer, null,
            React.createElement(tabs_1.Tabs, null,
                React.createElement(tabs_1.TabPane, { title: "建筑" },
                    React.createElement(home_style_1.ButtonContainer, null,
                        React.createElement(collection_component_1.default, null),
                        props.progress >= 1 &&
                            React.createElement(build_component_1.default, null)),
                    props.currentPlanet.progress > 0 &&
                        React.createElement(home_style_1.Title, null, "\u751F\u4EA7\u5EFA\u7B51"),
                    React.createElement(home_style_1.ListContainer, null, BuildingCards),
                    props.currentPlanet.progress > 10 &&
                        React.createElement(home_style_1.Title, null, "\u9632\u5FA1\u5EFA\u7B51"),
                    props.currentPlanet.progress > 20 &&
                        React.createElement(home_style_1.Title, null, "\u519B\u4E8B\u5EFA\u7B51")),
                props.currentPlanet.buildings.length > 10 &&
                    React.createElement(tabs_1.TabPane, { title: "科技" }),
                props.currentPlanet.buildings.length > 20 &&
                    React.createElement(tabs_1.TabPane, { title: "舰队" })))));
});
//# sourceMappingURL=home.component.js.map