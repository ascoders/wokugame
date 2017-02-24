import * as React from 'react'
import * as typings from './login.type'
import { browserHistory } from 'react-router'

import { Connect } from '../../../../components/dynamic-react'
import { Stores } from '../../stores'

import Button from '../../../../components/button'
import Input from '../../../../components/input'

import { Container, CenterContainer, PasswordContainer } from '../+register/register.style'

export default Connect<Stores>(state => {
    return {
        nickname: state.LoginPageStore.nickname,
        password: state.LoginPageStore.password
    }
})((props: typings.Props = new typings.Props()) => {
    const handleSubmit = async () => {
        const result = await props.actions.UserAction.loginWithNicknamePassword(props.nickname, props.password)
        if (result) {
            // 登录成功，跳转回去
            browserHistory.goBack()
        }
    }

    const handleNicknameChange = (event: React.FormEvent<HTMLInputElement>) => {
        props.actions.LoginPageAction.setNickname(event.currentTarget.value)
    }

    const handlePasswordChange = (event: React.FormEvent<HTMLInputElement>) => {
        props.actions.LoginPageAction.setPassword(event.currentTarget.value)
    }

    return (
        <Container>
            <CenterContainer>
                <Input label="昵称" value={props.nickname} onChange={handleNicknameChange} />
                <PasswordContainer>
                    <Input label="密码" value={props.password} onChange={handlePasswordChange} />
                </PasswordContainer>
                <Button onclick={handleSubmit}>完成</Button>
            </CenterContainer>
        </Container>
    )
})