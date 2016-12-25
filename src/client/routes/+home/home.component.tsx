import * as React from 'react'
import * as typings from './home.type'
import {connect} from '../../../../frame/index'

export default connect<Models.Root>(state => {
    return {
        headerColor: state.application.headerColor
    }
})((props: typings.PropsDefine = new typings.Props()) => {

    const handleClick = () => {
        props.dispatch({
            type: 'application/changeHeaderColor',
            payload: '123'
        })
    }

    return (
        <div>
            {props.headerColor}
            <button onClick={handleClick} type="ghost">click</button>
        </div>
    )
})