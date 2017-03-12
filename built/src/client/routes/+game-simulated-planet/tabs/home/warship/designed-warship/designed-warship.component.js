"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const typings = require("./designed-warship.type");
const dynamic_react_1 = require("../../../../../../../../components/dynamic-react");
const game_simulated_planet_1 = require("../../../../../../../common/game-simulated-planet");
const designed_warship_style_1 = require("./designed-warship.style");
let Design = class Design extends React.Component {
    constructor() {
        super(...arguments);
        this.state = new typings.State();
        this.handleProduct = () => {
        };
        this.handleDelete = () => {
            this.props.GameSimulatedPlanetAction.deleteWarship(this.props.GameSimulatedPlanetStore.currentPlanet.id, this.props.designedWarship.id);
        };
        this.handleChangeProductCount = (event) => {
            this.setState({
                productCount: Number(event.currentTarget.value)
            });
        };
    }
    render() {
        const warship = Object.assign({}, game_simulated_planet_1.warships.get(this.props.designedWarship.key));
        this.props.designedWarship.equipments.forEach(equipment => {
            for (let i = 0; i < equipment.count; i++) {
                game_simulated_planet_1.putOnEquipment(warship, equipment.key);
            }
        });
        return (React.createElement(designed_warship_style_1.DesignedWarshipContainer, null,
            React.createElement(designed_warship_style_1.DesignedWarshipTitle, null, this.props.designedWarship.name),
            React.createElement(designed_warship_style_1.DesignedWarshipDescription, null,
                "\u6570\u91CF\uFF1A",
                this.props.designedWarship.count,
                React.createElement(designed_warship_style_1.DeleteButton, { onClick: this.handleDelete }, "\u5220\u9664")),
            React.createElement(designed_warship_style_1.DesignedWarshipDescription, null,
                "\u62A4\u76FE\uFF1A",
                warship.shield,
                "\u8010\u4E45\uFF1A",
                warship.hp,
                "\u653B\u51FB\u529B\uFF1A",
                warship.power,
                "\u71C3\u6599\uFF1A",
                warship.fuel),
            React.createElement(designed_warship_style_1.DesignedWarshipDescription, null,
                "\u751F\u4EA7\uFF1A",
                this.state.productCount,
                React.createElement("input", { type: "range", onChange: this.handleChangeProductCount, min: 0, max: 100, value: this.state.productCount }),
                React.createElement(designed_warship_style_1.ProductButton, { onClick: this.handleProduct }, "\u5F00\u59CB"))));
    }
};
Design.defaultProps = new typings.Props();
Design = __decorate([
    dynamic_react_1.Connect
], Design);
exports.default = Design;
//# sourceMappingURL=designed-warship.component.js.map