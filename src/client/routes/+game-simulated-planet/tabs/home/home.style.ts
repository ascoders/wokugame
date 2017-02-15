import styled from 'styled-components'

export const Container = styled.div`
    display: flex;
    flex-direction: column;
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
    padding: 20px;
`

export const HeaderContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100px;
`

export const MainContainer = styled.div`
    flex-grow: 1;
`

export const HeaderInformationContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 0 20px;
    height: 40px;
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
    height: 60px;
`