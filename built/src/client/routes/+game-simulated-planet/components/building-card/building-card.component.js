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
const highlight_render_1 = require("../../utils/highlight-render");
const building_card_style_1 = require("./building-card.style");
let GameSimulatedPlanetScene = class GameSimulatedPlanetScene extends React.Component {
    constructor() {
        super(...arguments);
        this.built = false;
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
        this.startProgress();
    }
    componentWillUnmount() {
        this.interval.stop();
    }
    componentWillReceiveProps(nextProps) {
        if (!nextProps.building) {
            return;
        }
        if (nextProps.building.level > this.props.building.level) {
            this.built = false;
            this.startProgress();
        }
    }
    render() {
        if (!this.props.building) {
            return null;
        }
        const buildingInfo = game_simulated_planet_1.buildings.get(this.props.building.type);
        const currentLevelData = buildingInfo.data[this.props.building.level - 1];
        const Effects = buildingInfo.effects.map((effect, index) => {
            let effectDesc = game_simulated_planet_1.effectDescription.get(effect);
            const descriptionColorful = highlight_render_1.default(effectDesc, replaceIndex => {
                return (React.createElement("span", { key: replaceIndex + 'colorFul', style: { color: 'green' } }, currentLevelData[index + 2][replaceIndex].toString()));
            });
            return (React.createElement(building_card_style_1.EffectDescriptionSpan, { key: index }, descriptionColorful));
        });
        const destroyBuilding = () => {
            this.props.actions.GameSimulatedPlanetAction.destroyBuilding(this.props.planetId, this.props.building.id);
        };
        const upgradeBuilding = () => {
            this.props.actions.GameSimulatedPlanetAction.upgradeBuilding(this.props.planetId, this.props.building.id);
        };
        const startTime = new Date(this.props.building.buildStart);
        const currentTime = new Date();
        const buildTime = this.props.buildingHelper.getBuildTime(this.props.building);
        const remainingTime = currentTime.getTime() + this.props.serverTimeDiff - startTime.getTime() - buildTime;
        if (remainingTime <= 0) {
            const buildingText = this.props.building.level === 1 ? '建造中..' : '扩建中..';
            const progress = 100 - Math.floor(Math.abs(remainingTime) / buildTime * 100);
            return (React.createElement(building_card_style_1.Container, null,
                React.createElement(building_card_style_1.TitleContainer, null,
                    buildingInfo.name,
                    " Lv ",
                    this.props.building.level),
                React.createElement(building_card_style_1.DescriptionContainer, null,
                    React.createElement(building_card_style_1.ProgressContainer, null,
                        React.createElement(progress_1.Linear, { progress: progress }),
                        React.createElement(building_card_style_1.ProgressText, null,
                            buildingText,
                            " \u5269\u4F59 ",
                            timer_1.friendlyMillisecond(Math.abs(remainingTime)))))));
        }
        else {
            this.built = true;
            this.interval.stop();
        }
        return (React.createElement(building_card_style_1.Container, null,
            React.createElement(building_card_style_1.TitleContainer, null,
                buildingInfo.name,
                " Lv ",
                this.props.building.level),
            React.createElement(building_card_style_1.DescriptionContainer, null, Effects),
            React.createElement(building_card_style_1.OperateContainer, null,
                this.props.buildingHelper.hasLevelByInfo(buildingInfo, this.props.building.level + 1) === false
                    ? React.createElement(building_card_style_1.OperateButton, { theme: { max: true } }, "\u5DF2\u8FBE\u9876\u7EA7")
                    : React.createElement(tooltip_1.default, { position: "left" },
                        React.createElement(building_card_style_1.OperateButton, { onClick: upgradeBuilding }, "\u5347\u7EA7")),
                React.createElement(building_card_style_1.OperateButton, { onClick: destroyBuilding }, "\u62C6\u9664"))));
    }
};
GameSimulatedPlanetScene = __decorate([
    dynamic_react_1.Connect((state, props) => {
        return {
            planetId: state.GameSimulatedPlanetStore.gameUser.planets[state.GameSimulatedPlanetStore.currentPlanetIndex].id,
            building: state.GameSimulatedPlanetStore.gameUser.planets[state.GameSimulatedPlanetStore.currentPlanetIndex].buildings.find(building => building.id === props.buildingId),
            buildingHelper: state.GameSimulatedPlanetStore.buildingHelper,
            serverTimeDiff: state.GameSimulatedPlanetStore.serverTimeDiff
        };
    })
], GameSimulatedPlanetScene);
exports.default = GameSimulatedPlanetScene;
//# sourceMappingURL=building-card.component.js.map