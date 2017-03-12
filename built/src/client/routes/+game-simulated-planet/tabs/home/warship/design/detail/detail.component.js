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
const typings = require("./detail.type");
const dynamic_react_1 = require("../../../../../../../../../components/dynamic-react");
const tooltip_1 = require("../../../../../../../../../components/tooltip");
const timer_1 = require("../../../../../../../../../components/timer");
const game_simulated_planet_1 = require("../../../../../../../../common/game-simulated-planet");
const highlight_render_1 = require("../../../../../utils/highlight-render");
const detail_style_1 = require("./detail.style");
let Design = class Design extends React.Component {
    constructor() {
        super(...arguments);
        this.state = new typings.State();
        this.selectedEquipments = new Map();
        this.handleDesign = () => __awaiter(this, void 0, void 0, function* () {
            this.props.onClose();
            const selectedEquipmentsArray = [];
            this.selectedEquipments.forEach((count, equipmentKey) => {
                selectedEquipmentsArray.push({
                    key: equipmentKey,
                    count
                });
            });
            yield this.props.GameSimulatedPlanetAction.designWarship(this.props.GameSimulatedPlanetStore.currentPlanet.id, {
                name: this.state.name,
                key: this.props.warship.key,
                equipments: selectedEquipmentsArray
            });
            this.props.GameSimulatedPlanetAction.getDesignWarship(this.props.GameSimulatedPlanetStore.currentPlanet.id);
        });
        this.handleChangeName = (event) => {
            this.setState({
                name: event.currentTarget.value
            });
        };
    }
    componentWillMount() {
        this.setState({
            name: this.props.warship.name
        });
    }
    selectOrCancelEquipment(equipmentKey, isSelect) {
        const equipment = game_simulated_planet_1.allEquipments.get(equipmentKey);
        if (isSelect && (equipment.size + this.state.selectedSize > this.props.warship.size)) {
            return;
        }
        if (!this.selectedEquipments.has(equipmentKey)) {
            if (isSelect) {
                this.selectedEquipments.set(equipmentKey, 1);
                this.setState({
                    selectedSize: this.state.selectedSize + equipment.size
                });
            }
        }
        else {
            const count = this.selectedEquipments.get(equipmentKey);
            if (isSelect) {
                this.selectedEquipments.set(equipmentKey, count + 1);
                this.setState({
                    selectedSize: this.state.selectedSize + equipment.size
                });
            }
            else if (count > 0) {
                this.selectedEquipments.set(equipmentKey, count - 1);
                this.setState({
                    selectedSize: this.state.selectedSize - equipment.size
                });
            }
        }
    }
    render() {
        const Arms = game_simulated_planet_1.arms.map((armCategory, index) => {
            const ArmItems = armCategory.children.map((arm, childIndex) => {
                const Description = arm.effects.map((effectKey, effectIndex) => {
                    const currentEffectData = arm.data[effectIndex];
                    return highlight_render_1.default(game_simulated_planet_1.equipmentEffectDescription.get(effectKey), replaceIndex => {
                        return (React.createElement("span", { key: replaceIndex + 'colorFul', style: { color: 'green' } }, currentEffectData[replaceIndex]));
                    });
                });
                return (React.createElement(detail_style_1.EquipmentItemDetailContainer, { key: childIndex },
                    React.createElement(detail_style_1.EquipmentItemDetailTitleContainer, null,
                        React.createElement(detail_style_1.EquipmentItemDetailTitle, null, arm.name),
                        React.createElement(detail_style_1.EquipmentItemDetailDescription, null, Description)),
                    React.createElement(detail_style_1.EquipmentItemDetailOperation, null,
                        React.createElement(detail_style_1.AddOrDeleteButton, { onClick: this.selectOrCancelEquipment.bind(this, arm.key, true) }, "+"),
                        React.createElement(detail_style_1.EquipmentUseCount, null, this.selectedEquipments.get(arm.key) || 0),
                        React.createElement(detail_style_1.AddOrDeleteButton, { onClick: this.selectOrCancelEquipment.bind(this, arm.key, false) }, "-"))));
            });
            return (React.createElement(detail_style_1.EquipmentItemContainer, { key: index },
                React.createElement(detail_style_1.EquipmentItemTitle, null,
                    React.createElement(tooltip_1.default, { title: armCategory.description },
                        React.createElement("span", null, armCategory.name))),
                ArmItems));
        });
        const Equipments = game_simulated_planet_1.equipments.map((equipmentCategory, index) => {
            const EquipmentItems = equipmentCategory.children.map((equipment, childIndex) => {
                const Description = equipment.effects.map((effectKey, effectIndex) => {
                    const currentEffectData = equipment.data[effectIndex];
                    return highlight_render_1.default(game_simulated_planet_1.equipmentEffectDescription.get(effectKey), replaceIndex => {
                        return (React.createElement("span", { key: replaceIndex + 'colorFul', style: { color: 'green' } }, currentEffectData[replaceIndex]));
                    });
                });
                return (React.createElement(detail_style_1.EquipmentItemDetailContainerTwoColumn, { key: childIndex },
                    React.createElement(detail_style_1.EquipmentItemDetailTitleContainer, null,
                        React.createElement(detail_style_1.EquipmentItemDetailTitle, null, equipment.name),
                        React.createElement(detail_style_1.EquipmentItemDetailDescription, null, Description)),
                    React.createElement(detail_style_1.EquipmentItemDetailOperation, null,
                        React.createElement(detail_style_1.AddOrDeleteButton, { onClick: this.selectOrCancelEquipment.bind(this, equipment.key, true) }, "+"),
                        React.createElement(detail_style_1.EquipmentUseCount, null, this.selectedEquipments.get(equipment.key) || 0),
                        React.createElement(detail_style_1.AddOrDeleteButton, { onClick: this.selectOrCancelEquipment.bind(this, equipment.key, false) }, "-"))));
            });
            return (React.createElement(detail_style_1.EquipmentItemContainer, { key: index },
                React.createElement(detail_style_1.EquipmentItemTitle, null,
                    React.createElement(tooltip_1.default, { title: equipmentCategory.description },
                        React.createElement("span", null, equipmentCategory.name))),
                EquipmentItems));
        });
        const warshipWithEquipment = Object.assign({}, this.props.warship);
        this.selectedEquipments.forEach((count, equipmentName) => {
            for (let i = 0; i < count; i++) {
                game_simulated_planet_1.putOnEquipment(warshipWithEquipment, equipmentName);
            }
        });
        return (React.createElement("div", null,
            React.createElement(detail_style_1.FinalEffect, null,
                warshipWithEquipment.shield > this.props.warship.shield ?
                    React.createElement(detail_style_1.Effect, null,
                        "\u62A4\u76FE:",
                        React.createElement(detail_style_1.Green, null, warshipWithEquipment.shield)) :
                    React.createElement(detail_style_1.Effect, null,
                        "\u62A4\u76FE:",
                        warshipWithEquipment.shield),
                warshipWithEquipment.hp > this.props.warship.hp ?
                    React.createElement(detail_style_1.Effect, null,
                        "\u8010\u4E45:",
                        React.createElement(detail_style_1.Green, null, warshipWithEquipment.hp)) :
                    React.createElement(detail_style_1.Effect, null,
                        "\u8010\u4E45:",
                        warshipWithEquipment.hp),
                this.state.selectedSize > 0 ?
                    React.createElement(detail_style_1.Effect, null,
                        "\u7A7A\u95F4:",
                        React.createElement(detail_style_1.Green, null, this.state.selectedSize),
                        " / ",
                        this.props.warship.size) :
                    React.createElement(detail_style_1.Effect, null,
                        "\u7A7A\u95F4:",
                        this.state.selectedSize,
                        " / ",
                        this.props.warship.size),
                warshipWithEquipment.fuel > this.props.warship.fuel ?
                    React.createElement(detail_style_1.Effect, null,
                        "\u71C3\u6599\u4ED3\u7A7A\u95F4:",
                        React.createElement(detail_style_1.Green, null, warshipWithEquipment.fuel)) :
                    React.createElement(detail_style_1.Effect, null,
                        "\u71C3\u6599\u4ED3\u7A7A\u95F4:",
                        warshipWithEquipment.fuel),
                warshipWithEquipment.power > 0 ?
                    React.createElement(detail_style_1.Effect, null,
                        "\u653B\u51FB\u529B:",
                        React.createElement(detail_style_1.Green, null, warshipWithEquipment.power || 0)) :
                    React.createElement(detail_style_1.Effect, null,
                        "\u653B\u51FB\u529B:",
                        warshipWithEquipment.power || 0),
                warshipWithEquipment.crystal > this.props.warship.crystal ?
                    React.createElement(detail_style_1.Effect, null,
                        "\u6676\u4F53\u77FF\u6D88\u8017:",
                        React.createElement(detail_style_1.Red, null, warshipWithEquipment.crystal)) :
                    React.createElement(detail_style_1.Effect, null,
                        "\u6676\u4F53\u77FF\u6D88\u8017:",
                        warshipWithEquipment.crystal),
                warshipWithEquipment.gas > this.props.warship.gas ?
                    React.createElement(detail_style_1.Effect, null,
                        "\u74E6\u65AF\u6D88\u8017:",
                        React.createElement(detail_style_1.Red, null, warshipWithEquipment.gas)) :
                    React.createElement(detail_style_1.Effect, null,
                        "\u74E6\u65AF\u6D88\u8017:",
                        warshipWithEquipment.gas),
                warshipWithEquipment.time > this.props.warship.time ?
                    React.createElement(detail_style_1.Effect, null,
                        "\u751F\u4EA7\u8017\u65F6:",
                        React.createElement(detail_style_1.Red, null, timer_1.friendlyMillisecond(warshipWithEquipment.time))) :
                    React.createElement(detail_style_1.Effect, null,
                        "\u751F\u4EA7\u8017\u65F6:",
                        timer_1.friendlyMillisecond(warshipWithEquipment.time))),
            React.createElement(detail_style_1.EquipmentContainer, null,
                React.createElement(detail_style_1.EquipmentArmsContainer, null,
                    React.createElement(detail_style_1.EquipmentTitle, null, "\u6B66\u5668"),
                    React.createElement(detail_style_1.EquipmentList, null, Arms)),
                React.createElement(detail_style_1.EquipmentsContainer, null,
                    React.createElement(detail_style_1.EquipmentTitle, null, "\u88C5\u5907"),
                    React.createElement(detail_style_1.EquipmentList, null, Equipments))),
            React.createElement(detail_style_1.NameInput, { value: this.state.name, onChange: this.handleChangeName }),
            React.createElement(detail_style_1.OkButton, { onClick: this.handleDesign }, "\u786E\u8BA4")));
    }
};
Design.defaultProps = new typings.Props();
Design = __decorate([
    dynamic_react_1.Connect
], Design);
exports.default = Design;
//# sourceMappingURL=detail.component.js.map