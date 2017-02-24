import styled from 'styled-components'

export const Container = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 5rem;
    height: 2rem;
    border: 1px solid #ddd;
    border-radius: 1rem;
    cursor: pointer;
    transition: background-color .3s;
    user-select: none;
    color: #555;
    overflow: hidden;
    margin-left: 1rem;
    
    &:hover {
        background-color: whitesmoke;
    }
    
    &:active {
        background-color: #eee;
    }
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

export const BuildingCostContainer = styled.span`
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

export const BuildingCostItemContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-right: 15px;
`

export const BuildingCostTitle = styled.div`
    color: #666;
    margin-right: 5px;
`

export const BuildingCostValue = styled.div`
   
`