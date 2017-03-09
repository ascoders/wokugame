import * as React from 'react'
import * as typings from './design.type'
import { Connect } from '../../../../../../../../components/dynamic-react'

import Modal from '../../../../../../../../components/modal'
import Tooltip from '../../../../../../../../components/tooltip'
import { friendlyMillisecond } from '../../../../../../../../components/timer'
import { buildingList, buildings } from '../../../../../../../common/game-simulated-planet'
import { arms } from '../../../../../../../common/game-simulated-planet'

import {
    Container, FinalEffect, Effect, EquipmentContainer, EquipmentArmsContainer, EquipmentsContainer,
    EquipmentTitle, EquipmentList, EquipmentItemContainer, EquipmentItemTitle,
    EquipmentItemDetailContainer, EquipmentItemDetailTitle, EquipmentItemDetailOperation,
    EquipmentItemDetailTitleContainer, EquipmentItemDetailDescription
} from './design.style'

@Connect
export default class Design extends React.Component<typings.Props, typings.State> {
    static defaultProps = new typings.Props()
    state = new typings.State()

    handleClose = () => {
        this.setState({ show: false })
    }

    handleShow = () => {
        this.setState({ show: true })
    }

    /**
     * 飞船设计完毕
     */
    handleDesign = () => {

    }

    render() {
        const Arms = arms.map((armCategory, index) => {
            const ArmItems = armCategory.children.map((arm, childIndex) => {
                return (
                    <EquipmentItemDetailContainer key={childIndex}>
                        <EquipmentItemDetailTitleContainer>
                            <EquipmentItemDetailTitle>
                                {arm.name}
                            </EquipmentItemDetailTitle>
                            <EquipmentItemDetailDescription>
                                攻击力：{arm.power}。
                                体积：{arm.size}。
                            </EquipmentItemDetailDescription>
                        </EquipmentItemDetailTitleContainer>
                        <EquipmentItemDetailOperation>

                        </EquipmentItemDetailOperation>
                    </EquipmentItemDetailContainer>
                )
            })
            return (
                <EquipmentItemContainer key={index}>
                    <EquipmentItemTitle>
                        <Tooltip title={armCategory.description}>
                            <span>{armCategory.name}</span>
                        </Tooltip> 
                    </EquipmentItemTitle>
                    {ArmItems}
                </EquipmentItemContainer>
            )
        })

        return (
            <Container onClick={this.handleShow}>
                <Modal show={this.state.show} onClose={this.handleClose} title={`设计 ${this.props.airship.name}`}>
                    <FinalEffect>
                        <Effect>护盾: {this.props.airship.shield}</Effect>
                        <Effect>耐久: {this.props.airship.hp}</Effect>
                        <Effect>攻击力: 0</Effect>
                        <Effect>晶体矿消耗: {this.props.airship.crystal}</Effect>
                        <Effect>瓦斯消耗: {this.props.airship.gas}</Effect>
                        <Effect>生产耗时: {friendlyMillisecond(this.props.airship.time)}</Effect>
                    </FinalEffect>

                    <EquipmentContainer>
                        <EquipmentArmsContainer>
                            <EquipmentTitle>武器</EquipmentTitle>
                            <EquipmentList>{Arms}</EquipmentList>
                        </EquipmentArmsContainer>
                        <EquipmentsContainer>
                            <EquipmentTitle>装备</EquipmentTitle>
                            <EquipmentList></EquipmentList>
                        </EquipmentsContainer>
                    </EquipmentContainer>
                </Modal>
                设计
            </Container>
        )
    }
}