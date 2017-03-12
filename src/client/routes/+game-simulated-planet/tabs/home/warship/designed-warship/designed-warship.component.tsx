import * as React from 'react'
import * as typings from './designed-warship.type'
import { Connect } from '../../../../../../../../components/dynamic-react'
import { warships, putOnEquipment } from '../../../../../../../common/game-simulated-planet'

import {
    DesignedWarshipContainer, DesignedWarshipTitle, DesignedWarshipDescription, ProductButton,
    DeleteButton
} from './designed-warship.style'

@Connect
export default class Design extends React.Component<typings.Props, typings.State> {
    static defaultProps = new typings.Props()
    state = new typings.State()

    handleProduct = () => {

    }

    handleDelete = () => {
        this.props.GameSimulatedPlanetAction.deleteWarship(this.props.GameSimulatedPlanetStore.currentPlanet.id, this.props.designedWarship.id)
    }

    handleChangeProductCount = (event: React.FormEvent<HTMLInputElement>) => {
        this.setState({
            productCount: Number(event.currentTarget.value)
        })
    }

    render() {
        // 装备后的飞船数据
        const warship = Object.assign({}, warships.get(this.props.designedWarship.key))
        this.props.designedWarship.equipments.forEach(equipment => {
            for (let i = 0; i < equipment.count; i++) {
                putOnEquipment(warship, equipment.key)
            }
        })
        return (
            <DesignedWarshipContainer>
                <DesignedWarshipTitle>{this.props.designedWarship.name}</DesignedWarshipTitle>
                <DesignedWarshipDescription>
                    数量：{this.props.designedWarship.count}
                    <DeleteButton onClick={this.handleDelete}>删除</DeleteButton>
                </DesignedWarshipDescription>
                <DesignedWarshipDescription>
                    护盾：{warship.shield}
                    耐久：{warship.hp}
                    攻击力：{warship.power}
                    燃料：{warship.fuel}
                </DesignedWarshipDescription>
                <DesignedWarshipDescription>
                    生产：{this.state.productCount}
                    <input type="range" onChange={this.handleChangeProductCount} min={0} max={100} value={this.state.productCount} />
                    <ProductButton onClick={this.handleProduct}>开始</ProductButton>
                </DesignedWarshipDescription>
            </DesignedWarshipContainer>
        )
    }
}