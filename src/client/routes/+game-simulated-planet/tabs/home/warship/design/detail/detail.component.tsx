import * as React from 'react'
import * as typings from './detail.type'
import { Connect } from '../../../../../../../../../components/dynamic-react'

import Tooltip from '../../../../../../../../../components/tooltip'
import { friendlyMillisecond } from '../../../../../../../../../components/timer'
import { buildingList, buildings } from '../../../../../../../../common/game-simulated-planet'
import { allEquipments, arms, equipments, putOnEquipment, equipmentEffectDescription } from '../../../../../../../../common/game-simulated-planet'
import highlightRender from '../../../../../utils/highlight-render'

import {
    Container, FinalEffect, Effect, EquipmentContainer, EquipmentArmsContainer, EquipmentsContainer,
    EquipmentTitle, EquipmentList, EquipmentItemContainer, EquipmentItemTitle,
    EquipmentItemDetailContainer, EquipmentItemDetailTitle, EquipmentItemDetailOperation,
    EquipmentItemDetailTitleContainer, EquipmentItemDetailDescription, Green, Red, AddOrDeleteButton,
    EquipmentUseCount, EquipmentItemDetailContainerTwoColumn, OkButton, NameInput
} from './detail.style'

@Connect
export default class Design extends React.Component<typings.Props, typings.State> {
    static defaultProps = new typings.Props()
    state = new typings.State()

    /**
    * 选择的装备
    */
    private selectedEquipments?: Map<string, number> = new Map()

    componentWillMount() {
        this.setState({
            name: this.props.warship.name
        })
    }

    /**
     * 飞船设计完毕
     */
    handleDesign = async () => {
        this.props.onClose()
        const selectedEquipmentsArray: Array<{
            key: string,
            count: number
        }> = []
        this.selectedEquipments.forEach((count, equipmentKey) => {
            selectedEquipmentsArray.push({
                key: equipmentKey,
                count
            })
        })

        await this.props.GameSimulatedPlanetAction.designWarship(this.props.GameSimulatedPlanetStore.currentPlanet.id, {
            name: this.state.name,
            key: this.props.warship.key,
            equipments: selectedEquipmentsArray
        })

        // 刷新设计过的飞船列表
        this.props.GameSimulatedPlanetAction.getDesignWarship(this.props.GameSimulatedPlanetStore.currentPlanet.id)
    }

    /**
     * 选择/取消选择装备
     */
    selectOrCancelEquipment(equipmentKey: string, isSelect: boolean) {
        const equipment = allEquipments.get(equipmentKey)

        // 空间不能超过战舰最大空间上限
        if (isSelect && (equipment.size + this.state.selectedSize > this.props.warship.size)) {
            return
        }

        if (!this.selectedEquipments.has(equipmentKey)) {
            if (isSelect) {
                this.selectedEquipments.set(equipmentKey, 1)
                this.setState({
                    selectedSize: this.state.selectedSize + equipment.size
                })
            }
        } else {
            const count = this.selectedEquipments.get(equipmentKey)
            if (isSelect) {
                this.selectedEquipments.set(equipmentKey, count + 1)
                this.setState({
                    selectedSize: this.state.selectedSize + equipment.size
                })
            } else if (count > 0) {
                this.selectedEquipments.set(equipmentKey, count - 1)
                this.setState({
                    selectedSize: this.state.selectedSize - equipment.size
                })
            }
        }
    }

    /**
     * 修改战舰名字
     */
    handleChangeName = (event: React.FormEvent<HTMLInputElement>) => {
        this.setState({
            name: event.currentTarget.value
        })
    }

    render() {
        // 武器列表
        const Arms = arms.map((armCategory, index) => {
            const ArmItems = armCategory.children.map((arm, childIndex) => {
                const Description = arm.effects.map((effectKey, effectIndex) => {
                    const currentEffectData = arm.data[effectIndex]
                    // 每个装备效果详细介绍
                    return highlightRender(equipmentEffectDescription.get(effectKey), replaceIndex => {
                        return (
                            <span key={replaceIndex + 'colorFul'}
                                style={{ color: 'green' }}>{currentEffectData[replaceIndex]}</span>
                        )
                    })
                })

                return (
                    <EquipmentItemDetailContainer key={childIndex}>
                        <EquipmentItemDetailTitleContainer>
                            <EquipmentItemDetailTitle>
                                {arm.name}
                            </EquipmentItemDetailTitle>
                            <EquipmentItemDetailDescription>
                                {Description}
                            </EquipmentItemDetailDescription>
                        </EquipmentItemDetailTitleContainer>
                        <EquipmentItemDetailOperation>
                            <AddOrDeleteButton onClick={this.selectOrCancelEquipment.bind(this, arm.key, true)}>+</AddOrDeleteButton>
                            <EquipmentUseCount>{this.selectedEquipments.get(arm.key) || 0}</EquipmentUseCount>
                            <AddOrDeleteButton onClick={this.selectOrCancelEquipment.bind(this, arm.key, false)}>-</AddOrDeleteButton>
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

        // 装备列表
        const Equipments = equipments.map((equipmentCategory, index) => {
            const EquipmentItems = equipmentCategory.children.map((equipment, childIndex) => {
                const Description = equipment.effects.map((effectKey, effectIndex) => {
                    const currentEffectData = equipment.data[effectIndex]
                    // 每个装备效果详细介绍
                    return highlightRender(equipmentEffectDescription.get(effectKey), replaceIndex => {
                        return (
                            <span key={replaceIndex + 'colorFul'}
                                style={{ color: 'green' }}>{currentEffectData[replaceIndex]}</span>
                        )
                    })
                })

                return (
                    <EquipmentItemDetailContainerTwoColumn key={childIndex}>
                        <EquipmentItemDetailTitleContainer>
                            <EquipmentItemDetailTitle>
                                {equipment.name}
                            </EquipmentItemDetailTitle>
                            <EquipmentItemDetailDescription>
                                {Description}
                            </EquipmentItemDetailDescription>
                        </EquipmentItemDetailTitleContainer>
                        <EquipmentItemDetailOperation>
                            <AddOrDeleteButton onClick={this.selectOrCancelEquipment.bind(this, equipment.key, true)}>+</AddOrDeleteButton>
                            <EquipmentUseCount>{this.selectedEquipments.get(equipment.key) || 0}</EquipmentUseCount>
                            <AddOrDeleteButton onClick={this.selectOrCancelEquipment.bind(this, equipment.key, false)}>-</AddOrDeleteButton>
                        </EquipmentItemDetailOperation>
                    </EquipmentItemDetailContainerTwoColumn>
                )
            })
            return (
                <EquipmentItemContainer key={index}>
                    <EquipmentItemTitle>
                        <Tooltip title={equipmentCategory.description}>
                            <span>{equipmentCategory.name}</span>
                        </Tooltip>
                    </EquipmentItemTitle>
                    {EquipmentItems}
                </EquipmentItemContainer>
            )
        })

        // copy 一份飞船属性，算上装备加成
        const warshipWithEquipment = Object.assign({}, this.props.warship)

        this.selectedEquipments.forEach((count, equipmentName) => {
            for (let i = 0; i < count; i++) {
                putOnEquipment(warshipWithEquipment, equipmentName)
            }
        })

        return (
            <div>
                <FinalEffect>
                    {warshipWithEquipment.shield > this.props.warship.shield ?
                        <Effect>护盾:<Green>{warshipWithEquipment.shield}</Green></Effect> :
                        <Effect>护盾:{warshipWithEquipment.shield}</Effect>
                    }

                    {warshipWithEquipment.hp > this.props.warship.hp ?
                        <Effect>耐久:<Green>{warshipWithEquipment.hp}</Green></Effect> :
                        <Effect>耐久:{warshipWithEquipment.hp}</Effect>
                    }

                    {this.state.selectedSize > 0 ?
                        <Effect>空间:<Green>{this.state.selectedSize}</Green> / {this.props.warship.size}</Effect> :
                        <Effect>空间:{this.state.selectedSize} / {this.props.warship.size}</Effect>
                    }

                    {warshipWithEquipment.fuel > this.props.warship.fuel ?
                        <Effect>燃料仓空间:<Green>{warshipWithEquipment.fuel}</Green></Effect> :
                        <Effect>燃料仓空间:{warshipWithEquipment.fuel}</Effect>
                    }

                    {warshipWithEquipment.power > 0 ?
                        <Effect>攻击力:<Green>{warshipWithEquipment.power || 0}</Green></Effect> :
                        <Effect>攻击力:{warshipWithEquipment.power || 0}</Effect>
                    }

                    {warshipWithEquipment.crystal > this.props.warship.crystal ?
                        <Effect>晶体矿消耗:<Red>{warshipWithEquipment.crystal}</Red></Effect> :
                        <Effect>晶体矿消耗:{warshipWithEquipment.crystal}</Effect>
                    }

                    {warshipWithEquipment.gas > this.props.warship.gas ?
                        <Effect>瓦斯消耗:<Red>{warshipWithEquipment.gas}</Red></Effect> :
                        <Effect>瓦斯消耗:{warshipWithEquipment.gas}</Effect>
                    }

                    {warshipWithEquipment.time > this.props.warship.time ?
                        <Effect>生产耗时:<Red>{friendlyMillisecond(warshipWithEquipment.time)}</Red></Effect> :
                        <Effect>生产耗时:{friendlyMillisecond(warshipWithEquipment.time)}</Effect>
                    }
                </FinalEffect>

                <EquipmentContainer>
                    <EquipmentArmsContainer>
                        <EquipmentTitle>武器</EquipmentTitle>
                        <EquipmentList>{Arms}</EquipmentList>
                    </EquipmentArmsContainer>
                    <EquipmentsContainer>
                        <EquipmentTitle>装备</EquipmentTitle>
                        <EquipmentList>{Equipments}</EquipmentList>
                    </EquipmentsContainer>
                </EquipmentContainer>

                <NameInput value={this.state.name} onChange={this.handleChangeName} />
                <OkButton onClick={this.handleDesign}>确认</OkButton>
            </div>
        )
    }
}