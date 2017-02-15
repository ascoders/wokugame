import * as React from 'react'
import * as typings from './register.type'
import {browserHistory} from 'react-router'
import {connect} from '../../../../components/reax'
import {State, Actions} from '../../models'

import Button from '../../../../components/button'
import Input from '../../../../components/input'
import {Container, CenterContainer, PasswordContainer} from './register.style'

export default connect<State,typings.Props>(state => {
    return {
        user: state.user.authenticatedUser,
        nickname: state.registerPage.nickname,
        password: state.registerPage.password
    }
}, dispatch => {
    return {
        actions: new Actions(dispatch)
    }
})((props: typings.Props = new typings.Props()) => {
    const handleSubmit = async() => {
        const result = await props.actions.user.registerWithNicknamePassword(props.nickname, props.password)
        // todo bug
        if (result) {
            // 登录成功，跳转回去
            browserHistory.goBack()
        }
    }

    const handleNicknameChange = (event: React.FormEvent<HTMLInputElement>) => {
        props.actions.registerPage.setNickname(event.currentTarget.value)
    }

    const handlePasswordChange = (event: React.FormEvent<HTMLInputElement>) => {
        props.actions.registerPage.setPassword(event.currentTarget.value)
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