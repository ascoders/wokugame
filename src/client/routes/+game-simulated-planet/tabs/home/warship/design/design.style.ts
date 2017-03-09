import styled from 'styled-components'

export const Container = styled.div`
    padding: 5px 10px;
    border: 1px solid #ddd;
    border-top: none;
    border-bottom: none;
    border-radius: 5px;
    margin-left: 5px;
    font-size: 14px;
    color: #555;
    cursor: pointer;
`

export const FinalEffect = styled.div`
    display: flex;
`

export const Effect = styled.div`
    display: flex;
    align-items: center;
    padding: 10px;
`

export const EquipmentContainer = styled.div`
    display: flex;
    margin-top: 20px;
`

export const EquipmentArmsContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    flex-basis: 0%;
`

export const EquipmentsContainer = styled.div`
    flex-grow: 2;
    flex-basis: 0%;
    border-left: 1px solid #ddd;
`

export const EquipmentTitle = styled.div`
    display: flex;
    align-items: center;
    padding: 10px;
    background-color: whitesmoke;
`

export const EquipmentList = styled.div`
    height: 30rem;
    overflow-y: auto;
`

export const EquipmentItemContainer = styled.div`

`

export const EquipmentItemTitle = styled.div`
    padding: 10px;
    display: flex;
    align-items: center;
    font-weight: bold;
    border-bottom: 1px solid #ddd;
`

export const EquipmentItemDetailContainer = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 7px;
    & + & {
        padding-top: 0;
    }
`

export const EquipmentItemDetailTitleContainer = styled.div`
`

export const EquipmentItemDetailTitle = styled.div``

export const EquipmentItemDetailDescription = styled.div`
    color: #777;
    font-size: 12px;
    margin-top: 3px;
`

export const EquipmentItemDetailOperation = styled.div`
`