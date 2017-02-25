import styled from 'styled-components'

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    ${props => props.theme.noScroll ? `
        height: 100vh;
        `: `
        min-height: 100vh;
    `}
`