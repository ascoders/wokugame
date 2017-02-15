import styled from 'styled-components'

export const Container = styled.div`

`

export const BuildingContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 15px 0;
    &:first-child {
        padding-top: 0;
    }
    & + & {
        border-top: 1px solid #ddd;
    }
`

export const BuildingButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: whitesmoke;
    cursor: pointer;
    border: 1px solid #ddd;
    border-radius: 3px;
    height: 30px;
    padding: 0 10px;
    font-size: 14px;
    user-select: none;
`

export const BuildingTitle = styled.span`
    font-size: 16px;
    font-weight: bold;
    color: #333;
`

export const BuildingCost = styled.span`
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #555;
    margin-left: 10px;
    padding: 2px 10px;
    background-color: whitesmoke;
    border: 1px solid #eee;
    border-radius: 5px;
`

export const BuildingDescription = styled.div`
    display: flex;
    font-size: 14px;
    color: #666;
    padding: 5px 0;
`

export const BuildingTop = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 40px;
`

export const BuildingBottom = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`