import * as React from 'react'
import * as typings from './register.type'
import {observer, inject} from 'mobx-react'
import {browserHistory} from 'react-router'

import Button from '../../../../components/button'
import Input from '../../../../components/input'
import {Container, CenterContainer, PasswordContainer} from './register.style'

export default inject('User', 'RegisterPage')(observer((props: typings.Props = new typings.Props()) => {
    const handleSubmit = async() => {
        const result = await props.User.registerWithNicknamePassword(props.RegisterPage.store.nickname, props.RegisterPage.store.password)
        if (result) {
            // 登录成功，跳转回去
            browserHistory.goBack()
        }
    }

    const handleNicknameChange = (event: React.FormEvent<HTMLInputElement>) => {
        props.RegisterPage.setNickname(event.currentTarget.value)
    }

    const handlePasswordChange = (event: React.FormEvent<HTMLInputElement>) => {
        props.RegisterPage.setPassword(event.currentTarget.value)
    }

    return (
        <Container>
            <CenterContainer>
                <Input label="昵称" value={props.RegisterPage.store.nickname} onChange={handleNicknameChange}/>
                <PasswordContainer>
                    <Input label="密码" value={props.RegisterPage.store.password} onChange={handlePasswordChange}/>
                </PasswordContainer>
                <Button onclick={handleSubmit}>完成</Button>
            </CenterContainer>
        </Container>
    )
}))