import styled from 'styled-components'

export const Container = styled.div`
    position: relative;
    display: flex;
    width: 5rem;
    height: 2rem;
    border: 1px solid #ddd;
    border-radius: 1rem;
    cursor: pointer;
    transition: background-color .3s;
    user-select: none;
    color: #555;
    overflow: hidden;
    
    &:hover {
        background-color: whitesmoke;
    }
    
    &:active {
        background-color: #eee;
    }
`


export const Text = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
`

export const Progress = styled.div`
    background-color: whitesmoke;
    height: 2rem;
`