import styled from 'styled-components'

export const GridContainer = styled.div`
    display: grid;
    flex-grow: 1;
    grid-template-columns: repeat(4 1fr); 
    grid-template-rows: 50px auto 40px; 
    grid-template-areas: "header header header header" 
                         "sidebar main main main"
                         "footer footer footer footer";
`

export const Header = styled.div`
    grid-area: header;
    background-color: whitesmoke;
`

export const Main = styled.div`
    grid-area: main;
`

export const Sidebar = styled.div`
    grid-area: sidebar;
`

export const Footer = styled.div`
    grid-area: footer;
    background-color: whitesmoke;
`