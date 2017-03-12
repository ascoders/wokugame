import styled from 'styled-components'

export const DesignedWarshipContainer = styled.div`
    display: flex;
    flex-direction: column;
    & + & {
        border-top: 1px solid #ddd;
    }
`

export const DesignedWarshipTitle = styled.div`
    font-weight: bold;
    padding: 10px;
`

export const DesignedWarshipDescription = styled.div`
    padding: 0 10px;
`

export const ProductButton = styled.span`

`

export const DeleteButton = styled.span`
    margin-left: 10px;
`