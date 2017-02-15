import * as React from 'react'
import * as typings from './login.type'
import {connect} from '../../../../components/reax'
import {browserHistory} from 'react-router'
import {State, Actions} from '../../models'

import Button from '../../../../components/button'
import Input from '../../../../components/input'

import {Container, CenterContainer, PasswordContainer} from '../+register/register.style'

export default connect<State,typings.Props>(state => {
    return {
        user: state.user.authenticatedUser,
        nickname: state.loginPage.nickname,
        password: state.loginPage.password
    }
}, dispatch => {
    return {
        actions: new Actions(dispatch)
    }
})((props: typings.Props = new typings.Props()) => {
    const handleSubmit = async() => {
        const result = await props.actions.user.loginWithNicknamePassword(props.nickname, props.password)
        if (result) {
            // 登录成功，跳转回去
            browserHistory.goBack()
        }
    }

    const handleNicknameChange = (event: React.FormEvent<HTMLInputElement>) => {
        props.actions.loginPage.setNickname(event.currentTarget.value)
    }

    const handlePasswordChange = (event: React.FormEvent<HTMLInputElement>) => {
        props.actions.loginPage.setPassword(event.currentTarget.value)
    }

    return (
        <Container>
            <CenterContainer>
                <Input label="昵称" value={props.nickname} onChange={handleNicknameChange}/>
                <PasswordContainer>
                    <Input label="密码" value={props.password} onChange={handlePasswordChange}/>
                </PasswordContainer>
                <Button onclick={handleSubmit}>完成</Button>
            </CenterContainer>
        </Container>
    )
})