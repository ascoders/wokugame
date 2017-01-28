import styled, {keyframes} from 'styled-components'

const fadeInFromNone = keyframes`
    0% {
        display: none;
        opacity: 0;
    }
    1% {
        display: block;
        opacity: 0;
    }
    100% {
        display: block;
        opacity: 1;
    }
`

export const Container = styled.div`
    display: flex;
    align-items: center;
    padding: 0 20px;
    cursor: pointer;
    position: relative;
    &:hover {
        transition: background-color .3s;
    }
    height: ${props => props.theme.height}px;
`

export const TreeItem = styled.div`
    display: none;
    opacity: 0;
    position: absolute;
    top: ${props => props.theme.top}px;
    left: 0;
    [name='woku-menu-tree']:hover & {
        display: block;
        opacity: 1;
        animation: ${fadeInFromNone} 0.3s ease-out;
    }
`