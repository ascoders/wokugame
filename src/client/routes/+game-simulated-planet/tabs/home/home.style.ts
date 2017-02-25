import styled from 'styled-components'

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
`

export const Title = styled.div`
    background-color: whitesmoke;
    padding:10px;
    font-size: 1rem;
    color: #666;
    font-weight: bold;
`

export const ListContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 20px 20px 20px;
`

export const HeaderContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100px;
`

export const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
`

export const HeaderInformationContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 0 20px;
    min-height: 40px;
    margin-top: 10px;
`

export const HeaderInformationItem = styled.div`
    padding: 5px 10px;
    background-color: whitesmoke;
    border: 1px solid #ddd;
    margin-right: 10px;
    border-radius: 5px;
    color: #666;
`

export const HeaderOperationContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 0 20px;
    min-height: 60px;
`

export const ButtonContainer = styled.div`
    display: flex;
    padding: 20px;
`

export const ScrollContainer = styled.div`
    overflow-y: auto;
    flex-grow: 1;
`