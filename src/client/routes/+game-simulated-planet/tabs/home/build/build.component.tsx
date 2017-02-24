import * as React from 'react'
import * as typings from './build.type'

import { Connect } from '../../../../../../../components/dynamic-react'
import { Stores } from '../../../../../stores'

import { friendlyMillisecond } from '../../../../../../../components/timer'

import { buildingList, buildings } from '../../../../../../common/game-simulated-planet'

import {
    Container,
    BuildingContainer,
    BuildingButton,
    BuildingTitle,
    BuildingDescription,
    BuildingCost,
    BuildingTop,
    BuildingBottom
} from './build.style'

import Modal from '../../../../../../../components/modal'

import CrystalSvg from '../../../svgs/crystal.component'
import GasSvg from '../../../svgs/gas.component'
import HouseSvg from '../../../svgs/house.component'
import TimeSvg from '../../../svgs/time.component'

@Connect<Stores>(state => {
    const currentPlanet = state.GameSimulatedPlanetStore.gameUser.planets[state.GameSimulatedPlanetStore.currentPlanetIndex]

    return {
        planetId: state.GameSimulatedPlanetStore.gameUser.planets[state.GameSimulatedPlanetStore.currentPlanetIndex].id,
        gameUserProcess: state.GameSimulatedPlanetStore.gameUser.progress,
        currentPlanet,
        currentPlanetBuiltSize: state.GameSimulatedPlanetStore.currentPlanetBuiltSize,
        buildings: currentPlanet.buildings
    }
})
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
        this.props.actions.GameSimulatedPlanetAction.building(this.props.planetId, buildingName)
    }

    render() {
        const BuildingList = buildingList.map((buildingName, index) => {
            const buildingInfo = buildings.get(buildingName)

            // 如果没达到指定用户进度，就不显示
            if (this.props.gameUserProcess < buildingInfo.progressNeed) {
                return null
            }

            // 获取这个建筑已建造数量
            let buildCount = 0
            this.props.buildings.forEach(building => {
                if (building.type === buildingName) {
                    buildCount++
                }
            })

            return (
                <BuildingContainer key={index}>
                    <BuildingTop>
                        <BuildingTitle>{buildingInfo.name}</BuildingTitle>
                        <BuildingCost>
                            <CrystalSvg style={{ width: 25, height: 25, marginRight: 1 }} />
                            {this.colorfulText(buildingInfo.data[0][0].toString(), this.props.currentPlanet.crystal >= buildingInfo.data[0][0][0])}
                            <HouseSvg style={{ width: 20, height: 20, marginLeft: 20, marginRight: 3 }} />
                            {this.colorfulText(buildingInfo.size.toString(), this.props.currentPlanet.size - this.props.currentPlanetBuiltSize >= buildingInfo.size)}
                            <TimeSvg style={{ width: 17, height: 17, marginLeft: 20, marginRight: 5 }} />
                            <span style={{ color: 'green' }}> {friendlyMillisecond(buildingInfo.data[0][1][0])}</span>
                        </BuildingCost>
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