import styled from 'styled-components'

export const GridContainer = styled.div`
    display: grid;
    flex-grow: 1;
    grid-template-columns: 200px 1fr 1fr 1fr; 
    grid-template-rows: 50px auto 200px 40px; 
    grid-template-areas: "header header header header" 
                         "sidebar main main main"
                         "sidebar main main main"
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

export const Sidebar = styled.div`
    grid-area: sidebar;
`

export const Footer = styled.div`
    grid-area: footer;
    background-color: whitesmoke;
    display: flex;
    align-items: center;
    padding: 0 20px;
    color: #888;
`

export const SidebarMenuItem = styled.div`
    padding: 10px 20px;
    font-size: 18px;
    font-weight: bold;
    color: #666;
    ${props => props.theme.active && 'background-color: antiquewhite;'}
`