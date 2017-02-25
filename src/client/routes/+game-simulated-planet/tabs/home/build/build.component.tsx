import * as React from 'react'
import * as typings from './build.type'

import { Connect } from '../../../../../../../components/dynamic-react'

import { friendlyMillisecond } from '../../../../../../../components/timer'

import { buildingList, buildings } from '../../../../../../common/game-simulated-planet'

import {
    Container,
    BuildingContainer,
    BuildingButton,
    BuildingTitle,
    BuildingDescription,
    BuildingCostContainer,
    BuildingTop,
    BuildingBottom,
    BuildingCostItemContainer,
    BuildingCostTitle,
    BuildingCostValue
} from './build.style'

import Modal from '../../../../../../../components/modal'

import CrystalSvg from '../../../svgs/crystal.component'
import GasSvg from '../../../svgs/gas.component'
import HouseSvg from '../../../svgs/house.component'
import TimeSvg from '../../../svgs/time.component'

@Connect
export default class Build extends React.Component<typings.Props, typings.State> {
    static defaultProps = new typings.Props()
    state = new typings.State()

    handleClose = () => {
        this.setState({ show: false })
    }

    handleShow = () => {
        this.setState({ show: true })
    }

    colorfulText = (text: string, good: boolean) => {
        if (good) {
            return (
                <span style={{ color: 'green' }}>{text}</span>
            )
        }
        return (
            <span style={{ color: 'red' }}>{text}</span>
        )
    }

    /**
     * 建造这个建筑
     */
    handleBuild = (buildingName: string) => {
        this.props.GameSimulatedPlanetAction.building(this.props.GameSimulatedPlanetStore.currentPlanet.id, buildingName)
    }

    render() {
        const BuildingList = buildingList.map((buildingName, index) => {
            const buildingInfo = buildings.get(buildingName)

            // 如果没达到指定用户进度，就不显示
            if (this.props.GameSimulatedPlanetStore.gameUser.progress < buildingInfo.progressNeed) {
                return null
            }

            // 获取这个建筑已建造数量
            let buildCount = 0
            this.props.GameSimulatedPlanetStore.currentPlanet.buildings.forEach(building => {
                if (building.type === buildingName) {
                    buildCount++
                }
            })

            return (
                <BuildingContainer key={index}>
                    <BuildingTop>
                        <BuildingTitle>{buildingInfo.name}</BuildingTitle>
                        <BuildingCostContainer>
                            {buildingInfo.data[0][0][0] > 0 &&
                                <BuildingCostItemContainer>
                                    <BuildingCostTitle>晶体矿</BuildingCostTitle>
                                    <BuildingCostValue>
                                        {this.colorfulText(buildingInfo.data[0][0][0].toString(), this.props.GameSimulatedPlanetStore.currentPlanet.crystal >= buildingInfo.data[0][0][0])}
                                    </BuildingCostValue>
                                </BuildingCostItemContainer>
                            }

                            {buildingInfo.data[0][0][1] > 0 &&
                                <BuildingCostItemContainer>
                                    <BuildingCostTitle>瓦斯</BuildingCostTitle>
                                    <BuildingCostValue>
                                        {this.colorfulText(buildingInfo.data[0][0][1].toString(), this.props.GameSimulatedPlanetStore.currentPlanet.gas >= buildingInfo.data[0][0][1])}
                                    </BuildingCostValue>
                                </BuildingCostItemContainer>
                            }

                            <BuildingCostItemContainer>
                                <BuildingCostTitle>耗时</BuildingCostTitle>
                                <BuildingCostValue>
                                    <span style={{ color: 'green' }}> {friendlyMillisecond(buildingInfo.data[0][1][0])}</span>
                                </BuildingCostValue>
                            </BuildingCostItemContainer>

                            <BuildingCostItemContainer>
                                <BuildingCostTitle>占地</BuildingCostTitle>
                                <BuildingCostValue>
                                    {this.colorfulText(buildingInfo.size.toString(), this.props.GameSimulatedPlanetStore.currentPlanet.size - this.props.GameSimulatedPlanetStore.currentPlanetBuiltSize >= buildingInfo.size)}
                                </BuildingCostValue>
                            </BuildingCostItemContainer>
                        </BuildingCostContainer>
                    </BuildingTop>
                    <BuildingBottom>
                        <BuildingDescription>{buildingInfo.description}</BuildingDescription>

                        <BuildingButton onClick={this.handleBuild.bind(this, buildingName)}>
                            {buildCount} / {buildingInfo.limit} 建造
                        </BuildingButton>
                    </BuildingBottom>
                </BuildingContainer>
            )
        })

        return (
            <Container onClick={this.handleShow}>
                <Modal show={this.state.show} onClose={this.handleClose} title="建造">
                    {BuildingList}
                </Modal>
                建造
            </Container>
        )
    }
}