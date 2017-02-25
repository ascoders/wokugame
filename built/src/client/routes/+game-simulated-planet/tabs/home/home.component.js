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
exports.default = dynamic_react_1.Connect((props = new typings.Props()) => {
    if (!props.GameSimulatedPlanetStore.currentPlanet) {
        return null;
    }
    const BuildingCards = props.GameSimulatedPlanetStore.currentPlanet.buildings.sort((left, right) => {
        if (left.type === right.type) {
            return new Date(right.created).getTime() - new Date(left.created).getTime();
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
                    React.createElement(home_style_1.ScrollContainer, null,
                        React.createElement(home_style_1.ButtonContainer, null,
                            React.createElement(collection_component_1.default, null),
                            props.GameSimulatedPlanetStore.gameUser.progress >= 1 &&
                                React.createElement(build_component_1.default, null)),
                        React.createElement(home_style_1.ListContainer, null, BuildingCards))),
                props.GameSimulatedPlanetStore.currentPlanet.buildings.length > 10 &&
                    React.createElement(tabs_1.TabPane, { title: "科技" }),
                props.GameSimulatedPlanetStore.currentPlanet.buildings.length > 20 &&
                    React.createElement(tabs_1.TabPane, { title: "舰队" })))));
});
//# sourceMappingURL=home.component.js.map