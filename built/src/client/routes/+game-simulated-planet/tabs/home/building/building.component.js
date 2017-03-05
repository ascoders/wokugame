"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const typings = require("./building.type");
const dynamic_react_1 = require("../../../../../../../components/dynamic-react");
const game_simulated_planet_1 = require("../../../../../../common/game-simulated-planet");
const building_style_1 = require("./building.style");
const building_card_component_1 = require("../../../components/building-card/building-card.component");
const build_component_1 = require("./build/build.component");
const collection_component_1 = require("./collection/collection.component");
exports.default = dynamic_react_1.Connect((props = new typings.Props()) => {
    const BuildingCards = props.GameSimulatedPlanetStore.currentPlanet.buildings.sort((left, right) => {
        if (left.type === right.type) {
            return new Date(right.created).getTime() - new Date(left.created).getTime();
        }
        return game_simulated_planet_1.buildingList.findIndex(name => name === right.type) - game_simulated_planet_1.buildingList.findIndex(name => name === left.type);
    }).map((building, index) => {
        return (React.createElement(building_card_component_1.default, { key: building.id, buildingId: building.id }));
    });
    return (React.createElement(building_style_1.Container, null,
        React.createElement(building_style_1.ButtonContainer, null,
            React.createElement(collection_component_1.default, null),
            props.GameSimulatedPlanetStore.gameUser.progress >= 1 &&
                React.createElement(build_component_1.default, null)),
        React.createElement(building_style_1.ListContainer, null, BuildingCards)));
});
//# sourceMappingURL=building.component.js.map