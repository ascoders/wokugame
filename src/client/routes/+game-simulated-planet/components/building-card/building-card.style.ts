import styled from 'styled-components'

export const Container = styled.div`
    height: 40px;
    display: flex;
    align-items: center;
    flex-direction: row;
    & + & {
        border-top: 1px solid #eee;
    }
`

export const TitleContainer = styled.div`
    display: flex;
    padding: 0 10px;
    font-size: 16px;
    font-weight: bold;
`

export const DescriptionContainer = styled.div`
    flex-grow: 1;
    flex-basis: 0%;
    font-size: 14px;
    color: #666;
`

export const ProgressContainer = styled.div`
    display: flex;
    align-items: center;
    width: 15rem;
`

export const ProgressText = styled.div`
    margin-left: 10px;
    color: #999;
`

export const OperateContainer = styled.div`
    display: flex;
    padding: 0 10px;
`

export const EffectDescriptionSpan = styled.span`
    margin-right: 10px;
`

export const OperateButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding:5px 10px;
    border: 1px solid #ddd;
    border-top: none;
    border-bottom: none;
    border-radius: 5px;
    margin-left: 5px;
    font-size: 14px;
    color: #555;
    cursor: pointer;
    
    ${props => props.theme.max &&
`
    background-color: whitesmoke;
    color: #9e9e9e;
    text-shadow: 0 1px 1px #fff;
    cursor: default;
`
    }
`