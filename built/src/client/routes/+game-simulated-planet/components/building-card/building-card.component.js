"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const dynamic_react_1 = require("../../../../../../components/dynamic-react");
const game_simulated_planet_1 = require("../../../../../common/game-simulated-planet");
const progress_1 = require("../../../../../../components/progress");
const timer_1 = require("../../../../../../components/timer");
const tooltip_1 = require("../../../../../../components/tooltip");
const dynamic_object_1 = require("../../../../../../components/dynamic-object");
const highlight_render_1 = require("../../utils/highlight-render");
const building_card_style_1 = require("./building-card.style");
let GameSimulatedPlanetScene = class GameSimulatedPlanetScene extends React.Component {
    constructor() {
        super(...arguments);
        this.built = false;
        this.lastLevel = 0;
        this.getBuilding = () => {
            return this.props.GameSimulatedPlanetStore.currentPlanet.buildings
                .find(building => building.id === this.props.buildingId);
        };
        this.startProgress = () => {
            this.interval = new timer_1.Interval(() => {
                if (this.built) {
                    this.interval.stop();
                }
                else {
                    this.forceUpdate();
                }
            }, 200);
        };
    }
    componentWillMount() {
        const building = this.getBuilding();
        dynamic_object_1.observe(() => {
            if (building.level > this.lastLevel) {
                this.built = false;
                this.startProgress();
            }
            this.lastLevel = building.level;
        });
    }
    componentWillUnmount() {
        this.interval.stop();
    }
    render() {
        const building = this.getBuilding();
        if (!building) {
            return null;
        }
        const buildingInfo = game_simulated_planet_1.buildings.get(building.type);
        const currentLevelData = buildingInfo.data[building.level - 1];
        const Effects = buildingInfo.effects.map((effect, index) => {
            let effectDesc = game_simulated_planet_1.effectDescription.get(effect);
            const descriptionColorful = highlight_render_1.default(effectDesc, replaceIndex => {
                return (React.createElement("span", { key: replaceIndex + 'colorFul', style: { color: 'green' } }, currentLevelData[index + 2][replaceIndex].toString()));
            });
            return (React.createElement(building_card_style_1.EffectDescriptionSpan, { key: index }, descriptionColorful));
        });
        const destroyBuilding = () => {
            this.props.GameSimulatedPlanetAction.destroyBuilding(this.props.GameSimulatedPlanetStore.currentPlanet.id, building.id);
        };
        const upgradeBuilding = () => {
            this.props.GameSimulatedPlanetAction.upgradeBuilding(this.props.GameSimulatedPlanetStore.currentPlanet.id, building.id);
        };
        const startTime = new Date(building.buildStart);
        const currentTime = new Date();
        const buildTime = this.props.GameSimulatedPlanetStore.buildingHelper.getBuildTime(building);
        const remainingTime = currentTime.getTime() + this.props.GameSimulatedPlanetStore.serverTimeDiff - startTime.getTime() - buildTime;
        if (remainingTime <= 0) {
            const buildingText = building.level === 1 ? '建造中..' : '扩建中..';
            const progress = 100 - Math.floor(Math.abs(remainingTime) / buildTime * 100);
            return (React.createElement(building_card_style_1.Container, null,
                React.createElement(building_card_style_1.TitleContainer, null,
                    buildingInfo.name,
                    " Lv ",
                    building.level),
                React.createElement(building_card_style_1.DescriptionContainer, null,
                    React.createElement(building_card_style_1.ProgressContainer, null,
                        React.createElement(progress_1.Linear, { progress: progress }),
                        React.createElement(building_card_style_1.ProgressText, null,
                            buildingText,
                            " \u5269\u4F59 ",
                            timer_1.friendlyMillisecond(Math.abs(remainingTime)))))));
        }
        else {
            setImmediate(() => {
                this.built = true;
                this.interval.stop();
            });
        }
        return (React.createElement(building_card_style_1.Container, null,
            React.createElement(building_card_style_1.TitleContainer, null,
                buildingInfo.name,
                " Lv ",
                building.level),
            React.createElement(building_card_style_1.DescriptionContainer, null, Effects),
            React.createElement(building_card_style_1.OperateContainer, null,
                this.props.GameSimulatedPlanetStore.buildingHelper.hasLevelByInfo(buildingInfo, building.level + 1) === false
                    ? React.createElement(building_card_style_1.OperateButton, { theme: { max: true } }, "\u5DF2\u8FBE\u9876\u7EA7")
                    : React.createElement(tooltip_1.default, { position: "left" },
                        React.createElement(building_card_style_1.OperateButton, { onClick: upgradeBuilding }, "\u5347\u7EA7")),
                React.createElement(building_card_style_1.OperateButton, { onClick: destroyBuilding }, "\u62C6\u9664"))));
    }
};
GameSimulatedPlanetScene = __decorate([
    dynamic_react_1.Connect
], GameSimulatedPlanetScene);
exports.default = GameSimulatedPlanetScene;
//# sourceMappingURL=building-card.component.js.map