import styled from 'styled-components'

export const Container = styled.div`
    
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

export const EquipmentItemDetailContainerTwoColumn = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 7px;
    float: left;
    width: 50%;
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
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const Green = styled.span`
    color: green;
`

export const AddOrDeleteButton = styled.span`
    display: flex;
    align-items: center;
    cursor: pointer;
    height: 30px;
    padding: 5px 10px;
    border: 1px solid #eee;
    border-radius: 5px;
    user-select: none;
`

export const EquipmentUseCount = styled.span`
    padding: 0 10px;
`

export const Red = styled.span`
    color: red;
`

export const OkButton = styled.span`
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    cursor: pointer;
`

export const NameInput = styled.input`
    padding: 10px;
    outline: none;
    border: 1px solid #ddd;
`