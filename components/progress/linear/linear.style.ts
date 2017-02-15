import styled from 'styled-components'

export const Container = styled.span`
    display: flex;
    height: ${props => props.theme.height};
    background-color: whitesmoke;
    border-radius: 5px;
    flex-grow: 1;
`

export const Progress = styled.span`
    display: flex;
    background-color: #deae00;
    border-radius: 5px;
    height: ${props => props.theme.height};
    transition: width .3s;
`