import styled, { keyframes } from 'styled-components'

export const Container = styled.div`
    display: flex;
    flex-direction: column;
`

export const TitleContainer = styled.div`
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid #d9d9d9;
    min-height: 30px;
`

export const PaneContainer = styled.div`
    display: flex;
    flex-direction: column;
`

export const TabTitle = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px 16px 4px;
    cursor: pointer;
    margin-right: 2px;
    border: 1px solid #d9d9d9;
    border-radius: 6px 6px 0 0;
    color: #666;
    margin-bottom: -1px;
    ${props => !props.theme.active && 'background-color: whitesmoke;'}
    ${props => props.theme.active && 'border-bottom-color: white;'}
`