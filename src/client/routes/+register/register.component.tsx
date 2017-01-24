import * as React from 'react'
import * as typings from './register.type'
import {connect} from '../../../../frame/index'
const styles = require('./register.css')

import Button from '../../../../components/button'
import Input from '../../../../components/input'

export default connect<Models.Root>(state => {
    return {
        nickname: state.pageRegister.nickname,
        password: state.pageRegister.password
    }
})((props = new typings.Props()) => {
    const handleSubmit = () => {
        props.dispatch({
            type: 'user/create',
            payload: {
                nickname: props.nickname,
                password: props.password
            }
        })
    }

    const handleNicknameChange = (event: React.FormEvent<HTMLInputElement>) => {
        props.dispatch({
            type: 'pageRegister/updateNickname',
            payload: event.currentTarget.value
        })
    }

    const handlePasswordChange = (event: React.FormEvent<HTMLInputElement>) => {
        props.dispatch({
            type: 'pageRegister/updatePassword',
            payload: event.currentTarget.value
        })
    }

    return (
        <div className={styles.container}>
            <div className={styles.centerContainer}>
                <Input label="昵称" value={props.nickname} onChange={handleNicknameChange}/>
                <Input label="密码" value={props.password} onChange={handlePasswordChange} style={{marginTop:-2}}/>
                <Button onclick={handleSubmit}>完成</Button>
            </div>
        </div>
    )
})