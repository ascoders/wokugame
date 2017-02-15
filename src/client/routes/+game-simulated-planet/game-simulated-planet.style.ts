import styled from 'styled-components'

export const GridContainer = styled.div`
    display: grid;
    flex-grow: 1;
    grid-template-columns: repeat(4, 1fr); 
    grid-template-rows: 50px auto 200px 40px; 
    grid-template-areas: "header header header header" 
                         "sidebarTop main main main"
                         "sidebarBottom main main main"
                         "footer footer footer footer";
`

export const Header = styled.div`
    grid-area: header;
    display: flex;
    align-items: center;
    padding: 0 20px;
    background-color: whitesmoke;
`

export const Main = styled.div`
    display: flex;
    flex-direction: column;
    grid-area: main;
    border-left: 1px solid #d9d9d9;
`

export const SidebarTop = styled.div`
    grid-area: sidebarTop;
`

export const SidebarBottom = styled.div`
    grid-area: sidebarBottom;
`

export const Footer = styled.div`
    grid-area: footer;
    background-color: whitesmoke;
`

export const NotifyContainer = styled.div`
    padding: 20px 10px 10px 10px;
    color: #666;
`

export const SidebarMenuItem = styled.div`
    padding: 10px 20px;
    font-size: 18px;
    font-weight: bold;
    color: #666;
    ${props => props.theme.active && 'background-color: antiquewhite;'}
`

export const ScrollXContainer = styled.div`
    flex-grow: 1;
    overflow-y: scroll;
`