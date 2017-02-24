import * as React from 'react'
import * as typings from './building-card.type'

import { Connect } from '../../../../../../components/dynamic-react'
import { Stores } from '../../../../stores'

import { buildings, effectDescription } from '../../../../../common/game-simulated-planet'
import { Linear } from '../../../../../../components/progress'
import { Interval, friendlyMillisecond } from '../../../../../../components/timer'
import Tooltip from '../../../../../../components/tooltip'
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

@Connect<Stores>((state, props: typings.Props) => {
    return {
        planetId: state.GameSimulatedPlanetStore.gameUser.planets[state.GameSimulatedPlanetStore.currentPlanetIndex].id,
        building: state.GameSimulatedPlanetStore.gameUser.planets[state.GameSimulatedPlanetStore.currentPlanetIndex].buildings.find(building => building.id === props.buildingId),
        buildingHelper: state.GameSimulatedPlanetStore.buildingHelper,
        // todo 要去掉
        serverTimeDiff: state.GameSimulatedPlanetStore.serverTimeDiff
    }
})
export default class GameSimulatedPlanetScene extends React.Component<typings.Props, any> {
    private interval: Interval
    private built: boolean = false

    componentWillMount() {
        this.startProgress()
    }

    componentWillUnmount() {
        this.interval.stop()
    }

    componentWillReceiveProps(nextProps: typings.Props) {
        if (!nextProps.building) {
            return
        }

        // 如果升级了，变为建造状态
        if (nextProps.building.level > this.props.building.level) {
            this.built = false
            this.startProgress()
        }
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
        }, 500)
    }

    render() {
        if (!this.props.building) {
            return null
        }

        const buildingInfo = buildings.get(this.props.building.type)

        // 第一个等级下标从 0 开始
        // 第一个效果的下标从 2 开始
        const currentLevelData = buildingInfo.data[this.props.building.level - 1]

        const Effects = buildingInfo.effects.map((effect, index) => {
            let effectDesc = effectDescription.get(effect)

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

        /**
         * 拆除建筑
         */
        const destroyBuilding = () => {
            this.props.actions.GameSimulatedPlanetAction.destroyBuilding(this.props.planetId, this.props.building.id)
        }

        /**
         * 升级建筑
         */
        const upgradeBuilding = () => {
            this.props.actions.GameSimulatedPlanetAction.upgradeBuilding(this.props.planetId, this.props.building.id)
        }

        // 如果还没建造完毕，显示进度条
        const startTime = new Date(this.props.building.buildStart)
        const currentTime = new Date()
        const buildTime = this.props.buildingHelper.getBuildTime(this.props.building)
        const remainingTime = currentTime.getTime() + this.props.serverTimeDiff - startTime.getTime() - buildTime
        if (remainingTime <= 0) {
            const buildingText = this.props.building.level === 1 ? '建造中..' : '扩建中..'
            const progress = 100 - Math.floor(Math.abs(remainingTime) / buildTime * 100)

            return (
                <Container>
                    <TitleContainer>
                        {buildingInfo.name} Lv {this.props.building.level}
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
            this.built = true
            this.interval.stop()
        }

        return (
            <Container>
                <TitleContainer>
                    {buildingInfo.name} Lv {this.props.building.level}
                </TitleContainer>

                <DescriptionContainer>
                    {Effects}
                </DescriptionContainer>

                <OperateContainer>
                    {this.props.buildingHelper.hasLevelByInfo(buildingInfo, this.props.building.level + 1) === false
                        ? <OperateButton theme={{ max: true }}>已达顶级</OperateButton>
                        : <Tooltip position="left"><OperateButton onClick={upgradeBuilding}>升级</OperateButton></Tooltip>
                    }
                    <OperateButton onClick={destroyBuilding}>拆除</OperateButton>
                </OperateContainer>
            </Container>
        )
    }
}