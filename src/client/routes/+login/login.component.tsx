import * as React from 'react'
import * as typings from './login.type'
import { browserHistory } from 'react-router'

import { Connect } from 'dynamic-react'

import Button from '@gaea/button'
import Input from '../../../../components/input'

import { Container, CenterContainer, PasswordContainer } from '../+register/register.style'

export default Connect((props: typings.Props = new typings.Props()) => {
    const handleSubmit = async () => {
        const result = await props.UserAction.loginWithNicknamePassword(props.LoginPageStore.nickname, props.LoginPageStore.password)
        if (result) {
            // 登录成功，跳转回去
            browserHistory.goBack()
        }
    }

    const handleNicknameChange = (event: React.FormEvent<HTMLInputElement>) => {
        props.LoginPageAction.setNickname(event.currentTarget.value)
    }

    const handlePasswordChange = (event: React.FormEvent<HTMLInputElement>) => {
        props.LoginPageAction.setPassword(event.currentTarget.value)
    }

    return (
        <Container>
            <CenterContainer>
                <Input label="昵称" value={props.LoginPageStore.nickname} onChange={handleNicknameChange} />
                <PasswordContainer>
                    <Input label="密码" value={props.LoginPageStore.password} onChange={handlePasswordChange} />
                </PasswordContainer>
                <Button onclick={handleSubmit}>完成</Button>
            </CenterContainer>
        </Container>
    )
})