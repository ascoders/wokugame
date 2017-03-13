"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const game_simulated_planet_1 = require("../../../../../../common/game-simulated-planet");
const dynamic_react_1 = require("../../../../../../../components/dynamic-react");
const tooltip_1 = require("../../../../../../../components/tooltip");
const design_component_1 = require("./design/design.component");
const warship_style_1 = require("./warship.style");
const designed_warship_component_1 = require("./designed-warship/designed-warship.component");
let Warship = class Warship extends React.Component {
    componentWillMount() {
        this.props.GameSimulatedPlanetAction.getDesignWarship(this.props.GameSimulatedPlanetStore.currentPlanet.id);
    }
    render() {
        const Drawing = game_simulated_planet_1.warshipList.map((warshipCategory, index) => {
            const Drawings = warshipCategory.children.map((warship, childIndex) => {
                return (React.createElement(warship_style_1.AirshipContent, { key: childIndex },
                    React.createElement(warship_style_1.AirshipContentLeft, null,
                        warship.name,
                        " \u62A4\u76FE\uFF1A",
                        warship.shield,
                        " \u8010\u4E45\uFF1A",
                        warship.hp,
                        " \u7A7A\u95F4\uFF1A",
                        warship.size),
                    React.createElement(warship_style_1.AirshipContentRight, null,
                        React.createElement(design_component_1.default, { warship: warship }))));
            });
            return (React.createElement(warship_style_1.AirshipContainer, { key: index },
                React.createElement(tooltip_1.default, { title: warshipCategory.description },
                    React.createElement(warship_style_1.AirshipCategory, null, warshipCategory.name)),
                Drawings.length === 0 ?
                    React.createElement(warship_style_1.NoDrawingContainer, null, "\u8FD8\u672A\u62E5\u6709\u56FE\u7EB8") :
                    Drawings));
        });
        const designedWarships = this.props.GameSimulatedPlanetStore.designedWarships
            .get(this.props.GameSimulatedPlanetStore.currentPlanet.id);
        const DesignedWarshipsElement = designedWarships && designedWarships.reverse().map((designedWarship, index) => {
            return (React.createElement(designed_warship_component_1.default, { key: index, designedWarship: designedWarship }));
        });
        return (React.createElement(warship_style_1.Container, null,
            React.createElement(warship_style_1.LeftContainer, null,
                React.createElement(warship_style_1.Title, null, "\u6218\u8230\u539F\u578B"),
                Drawing),
            React.createElement(warship_style_1.RightContainer, null,
                React.createElement(warship_style_1.Title, null, "\u751F\u4EA7"),
                React.createElement("div", null, "\u751F\u4EA7\u961F\u5217"),
                React.createElement("div", null, "10\u7EA7\u89E3\u9501"),
                DesignedWarshipsElement)));
    }
};
Warship = __decorate([
    dynamic_react_1.Connect
], Warship);
exports.default = Warship;
//# sourceMappingURL=warship.component.js.map