import styled from 'styled-components'
import * as MenuStyle from '../menu/menu.style'

export const Container = styled.div`
    display: flex;
    align-items: center;
    padding: 0 20px;
    white-space: nowrap;
    height: ${props => props.theme.height}px;
`