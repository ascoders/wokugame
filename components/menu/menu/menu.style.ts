import styled from 'styled-components'

const lightColor = '#333'
const lightColorActive = '#666'

export const ContainerComponent = styled.div`
    display: flex;
    flex-direction: row;
    background-color: ${lightColor};
    height: ${props => props.theme.height}px;

    [name='woku-menu-item'], [name='woku-menu-item'] a {
        color: white;
        text-decoration: none;
    }

    [name='woku-menu-item']:hover, [name='woku-menu-subtree'] a:hover {
        background-color: ${lightColorActive};
    }

    [name='woku-menu-subtree'] {
        background-color: ${lightColor};
    }
`