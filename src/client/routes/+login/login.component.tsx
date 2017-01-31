import * as React from 'react'
import * as typings from './login.type'
import {observer, inject} from 'mobx-react'
import {browserHistory} from 'react-router'

import Button from '../../../../components/button'
import Input from '../../../../components/input'

import {Container, CenterContainer, PasswordContainer} from '../+register/register.style'

export default inject('User', 'LoginPage')(observer((props: typings.Props = new typings.Props()) => {
    const handleSubmit = async() => {
        const result = await props.User.loginWithNicknamePassword(props.LoginPage.store.nickname, props.LoginPage.store.password)
        if (result) {
            // 登录成功，跳转回去
            browserHistory.goBack()
        }
    }

    const handleNicknameChange = (event: React.FormEvent<HTMLInputElement>) => {
        props.LoginPage.setNickname(event.currentTarget.value)
    }

    const handlePasswordChange = (event: React.FormEvent<HTMLInputElement>) => {
        props.LoginPage.setPassword(event.currentTarget.value)
    }

    return (
        <Container>
            <CenterContainer>
                <Input label="昵称" value={props.LoginPage.store.nickname} onChange={handleNicknameChange}/>
                <PasswordContainer>
                    <Input label="密码" value={props.LoginPage.store.password} onChange={handlePasswordChange}/>
                </PasswordContainer>
                <Button onclick={handleSubmit}>完成</Button>
            </CenterContainer>
        </Container>
    )
}))