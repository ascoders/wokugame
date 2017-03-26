import * as React from 'react'
import * as typings from './register.type'
import { browserHistory } from 'react-router'

import { Connect } from 'dynamic-react'

import Button from '../../../../components/button'
import Input from '../../../../components/input'
import { Container, CenterContainer, PasswordContainer } from './register.style'

export default Connect((props: typings.Props = new typings.Props()) => {
    const handleSubmit = async () => {
        const result = await props.UserAction.registerWithNicknamePassword(props.RegisterPageStore.nickname, props.RegisterPageStore.password)
        if (result) {
            // 登录成功，跳转回去
            browserHistory.goBack()
        }
    }

    const handleNicknameChange = (event: React.FormEvent<HTMLInputElement>) => {
        props.RegisterPageAction.setNickname(event.currentTarget.value)
    }

    const handlePasswordChange = (event: React.FormEvent<HTMLInputElement>) => {
        props.RegisterPageAction.setPassword(event.currentTarget.value)
    }

    return (
        <Container>
            <CenterContainer>
                <Input label="昵称" value={props.RegisterPageStore.nickname} onChange={handleNicknameChange} />
                <PasswordContainer>
                    <Input label="密码" value={props.RegisterPageStore.password} onChange={handlePasswordChange} />
                </PasswordContainer>
                <Button onclick={handleSubmit}>完成</Button>
            </CenterContainer>
        </Container>
    )
})