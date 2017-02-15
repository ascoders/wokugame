import * as React from 'react'
import * as typings from './building-card.type'
import {connect} from '../../../../../../components/reax'
import {State, Actions} from '../../../../models'

import {buildings, effectDescription} from '../../../../../common/game-simulated-planet'
import {Linear} from '../../../../../../components/progress'
import {Interval, friendlyMillisecond} from '../../../../../../components/timer'
import Tooltip from '../../../../../../components/tooltip'

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

const replaceRender = (origin: any, replaceFunction: (index: number) => React.ReactElement<any>) => {
    // 存储已扫描的字符串
    let strStore = ''

    // 第几次遇到变量
    let variableCount = 0

    // 字符串 react 数组
    const strElement: React.ReactElement<any>[] = []

    for (let index in origin) {
        const indexNumber = Number(index)

        // 遇到了 %
        if (origin[indexNumber] === '%') {
            if (indexNumber === origin.length - 1) {
                // 最后一个，没有含义，扔给后面处理
            } else {
                // 除了最后一个，都需要判断
                if (origin[indexNumber + 1] === 'd') {
                    // 下一个是 d
                    strElement.push((
                        <span key={indexNumber+'str'}>{strStore}</span>
                    ))
                    strStore = ''
                    strElement.push(replaceFunction(variableCount++))
                    continue
                } else {
                    // 下一个不是 d，不管了，扔给后面处理
                }
            }
        }

        // 遇到了 d
        if (origin[indexNumber] === 'd') {
            if (indexNumber === 0) {
                // 第一个，没有含义，扔给后面处理
            } else {
                // 除了第一个，都需要判断
                if (origin[indexNumber - 1] === '%') {
                    // 前一个是 %, 已经处理过了，这里不做处理
                    continue
                } else {
                    // 前一个不是 %，不管了，扔给后面处理处理
                }
            }
        }

        strStore += origin[indexNumber]

        // 兜底，如果是最后一个，还执行到了这里，字符串store还有值，那就显示出来
        if (indexNumber === origin.length - 1 && strStore !== '') {
            strElement.push((
                <span key={indexNumber}>{strStore}</span>
            ))
        }
    }

    return strElement
}

@connect<State, typings.Props>((state, props) => {
    return {
        gameUserId: state.gameSimulated.gameUser.id,
        building: state.gameSimulated.gameUser.planets[state.gameSimulated.currentPlanetIndex].buildings.find(building => building.id === props.buildingId),
        buildingHelper: state.gameSimulated.buildingHelper,
        // todo 要去掉
        serverTimeDiff: state.gameSimulated.serverTimeDiff
    }
}, dispatch => {
    return {
        actions: new Actions(dispatch)
    }
})
export default class GameSimulatedPlanetScene extends React.Component<typings.Props,any> {
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

            const descriptionColorful = replaceRender(effectDesc, replaceIndex => {
                return (
                    <span key={replaceIndex+'colorFul'}
                          style={{color:'green'}}>{currentLevelData[index + 2][replaceIndex].toString()}</span>
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
            this.props.actions.gameSimulated.destroyBuilding(this.props.gameUserId, this.props.building.id)
        }

        /**
         * 升级建筑
         */
        const upgradeBuilding = () => {
            this.props.actions.gameSimulated.upgradeBuilding(this.props.gameUserId, this.props.building.id)
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
                            <Linear progress={progress}/>
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
                        ?<OperateButton theme={{max:true}}>已达顶级</OperateButton>
                        :<Tooltip position="left"><OperateButton onClick={upgradeBuilding}>升级</OperateButton></Tooltip>
                    }
                    <OperateButton onClick={destroyBuilding}>拆除</OperateButton>
                </OperateContainer>
            </Container>
        )
    }
}