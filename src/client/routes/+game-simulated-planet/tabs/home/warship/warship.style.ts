import styled from 'styled-components'

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    overflow-y: auto;
    flex-grow: 1;
`

export const LeftContainer = styled.div`
    flex-grow: 1;
    flex-basis: 0%;
`

export const RightContainer = styled.div`
    flex-grow: 1;
    flex-basis: 0%;
`

export const Title = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2rem;
    font-weight: bold;
    padding: 10px;
    border-bottom: 1px solid #ddd;
`

export const AirshipContainer = styled.div`
    border-bottom: 1px solid #ddd;
`

export const AirshipCategory = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.1rem;
    padding: 10px;
    background-color: whitesmoke;
`

export const NoDrawingContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.1rem;
    padding: 10px;
    color: #999;
`

export const AirshipContent = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px;
    &+& {
        padding-top: 0;
    }
`

export const AirshipContentLeft = styled.div`

`

export const AirshipContentRight = styled.div`

`