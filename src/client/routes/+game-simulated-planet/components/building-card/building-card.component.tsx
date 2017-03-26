import * as React from 'react'
import * as typings from './building-card.type'

import { Connect } from 'dynamic-react'

import { buildings, buildingEffectDescription } from '../../../../../common/game-simulated-planet'
import { Linear } from '../../../../../../components/progress'
import { Interval, friendlyMillisecond } from '../../../../../../components/timer'
import Tooltip from '../../../../../../components/tooltip'
import { observe } from 'dynamic-object'
import highlightRender from '../../utils/highlight-render'

import {
    Container,
    TitleContainer,
    DescriptionContainer,
    OperateContainer,
    EffectDescriptionSpan,
    OperateButton,
    ProgressContainer,
    ProgressText
} from './building-card.style'

@Connect
export default class GameSimulatedPlanetScene extends React.Component<typings.Props, any> {
    private interval: Interval
    private built: boolean = false

    private lastLevel = 0

    componentWillMount() {
        const building = this.getBuilding()

        observe(() => {
            if (building.level > this.lastLevel) {
                this.built = false
                this.startProgress()
            }

            this.lastLevel = building.level
        })
    }

    componentWillUnmount() {
        this.interval.stop()
    }

    getBuilding = () => {
        return this.props.GameSimulatedPlanetStore.currentPlanet.buildings
            .find(building => building.id === this.props.buildingId)
    }

    /**
     * 开启建造进度条
     */
    startProgress = () => {
        this.interval = new Interval(() => {
            // 如果没有完成建造，就一直刷新
            if (this.built) {
                this.interval.stop()
            } else {
                this.forceUpdate()
            }
        }, 200)
    }

    /**
        * 拆除建筑
        */
    destroyBuilding = () => {
        const building = this.getBuilding()
        this.props.GameSimulatedPlanetAction.destroyBuilding(this.props.GameSimulatedPlanetStore.currentPlanet.id, building.id)
    }

    /**
     * 升级建筑
     */
    upgradeBuilding = () => {
        const building = this.getBuilding()
        this.props.GameSimulatedPlanetAction.upgradeBuilding(this.props.GameSimulatedPlanetStore.currentPlanet.id, building.id)
    }

    render() {
        const building = this.getBuilding()

        if (!building) {
            return null
        }

        const buildingInfo = buildings.get(building.type)

        // 第一个等级下标从 0 开始
        // 第一个效果的下标从 2 开始
        const currentLevelData = buildingInfo.data[building.level - 1]

        const Effects = buildingInfo.effects.map((effect, index) => {
            let effectDesc = buildingEffectDescription.get(effect)

            const descriptionColorful = highlightRender(effectDesc, replaceIndex => {
                return (
                    <span key={replaceIndex + 'colorFul'}
                        style={{ color: 'green' }}>{currentLevelData[index + 2][replaceIndex].toString()}</span>
                )
            })

            return (
                <EffectDescriptionSpan key={index}>{descriptionColorful}</EffectDescriptionSpan>
            )
        })

        // 如果还没建造完毕，显示进度条
        const startTime = new Date(building.buildStart)
        const currentTime = new Date()
        const buildTime = this.props.GameSimulatedPlanetStore.buildingHelper.getBuildTime(building)
        const remainingTime = currentTime.getTime() + this.props.GameSimulatedPlanetStore.serverTimeDiff - startTime.getTime() - buildTime
        if (remainingTime <= 0) {
            const buildingText = building.level === 1 ? '建造中..' : '扩建中..'
            const progress = 100 - Math.floor(Math.abs(remainingTime) / buildTime * 100)

            return (
                <Container>
                    <TitleContainer>
                        {buildingInfo.name} Lv {building.level}
                    </TitleContainer>

                    <DescriptionContainer>
                        <ProgressContainer>
                            <Linear progress={progress} />
                            <ProgressText>
                                {buildingText} 剩余 {friendlyMillisecond(Math.abs(remainingTime))}
                            </ProgressText>
                        </ProgressContainer>
                    </DescriptionContainer>
                </Container>
            )
        } else {
            // 建造完毕
            setImmediate(() => {
                this.built = true
                this.interval.stop()
            })
        }

        return (
            <Container>
                <TitleContainer>
                    {buildingInfo.name} Lv {building.level}
                </TitleContainer>

                <DescriptionContainer>
                    {Effects}
                </DescriptionContainer>

                <OperateContainer>
                    {this.props.GameSimulatedPlanetStore.buildingHelper.hasLevelByInfo(buildingInfo, building.level + 1) === false
                        ? <OperateButton theme={{ max: true }}>已达顶级</OperateButton>
                        : <Tooltip position="left"><OperateButton onClick={this.upgradeBuilding}>升级</OperateButton></Tooltip>
                    }
                    <OperateButton onClick={this.destroyBuilding}>拆除</OperateButton>
                </OperateContainer>
            </Container>
        )
    }
}