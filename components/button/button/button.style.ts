import styled from 'styled-components'

export const Container = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #a49ef0;
    border-color: #a49ef0;
    color: #FFF;
    padding: 1rem;
    font-size: 1.2rem;
    cursor: pointer;
    border-radius: 0.3rem;
    user-select: none;
    
    &:active {
        background-color: #827ae1;
        border-color: #827ae1;
        color: #5246e2;
        text-shadow: 0 1px 0 rgba(255, 255, 255, 0.3);
        text-decoration: none;
        box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.2);
    }
`