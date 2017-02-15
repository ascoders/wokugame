import styled from 'styled-components'

export const Container = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 100;
    outline: 0;
    background-color: rgba(0,0,0,.35);
    ${props => !props.theme.show && 'display:none;'}
`

export const ModalContainer = styled.div`
    width: 60%;
    margin: 30px auto;
    background-color: white;
`

export const ModalContent = styled.div`

`

export const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px 20px 15px 20px;
    border-bottom: 1px solid #ddd;
`

export const ModalTitle = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    color: #444;
    font-size: 20px;
    font-weight: bold;
`

export const ModalBody = styled.div`
    padding: 20px;
`

export const CloseButton = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    font-weight: bold;
    color: #000;
    text-shadow: 0 1px 0 #fff;
    opacity: .2;
    transition: opacity .3s;
    outline: none;
    &:hover {
        opacity: .6;
    }
`