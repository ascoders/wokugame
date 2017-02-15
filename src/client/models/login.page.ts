import {model, Iaction} from '../../../components/reax'

export class LoginPageStore {
    nickname = ''
    password = ''
}

export const LoginPageModel = model<LoginPageStore>({
    namespace: 'loginPage',
    state: new LoginPageStore(),
    reducers: {
        setNickname: (state, action: Iaction<string>) => {
            return {
                ...state,
                nickname: action.payload
            }
        },
        setPassword: (state, action: Iaction<string>) => {
            return {
                ...state,
                password: action.payload
            }
        }
    }
})

export class LoginPageActions {
    setNickname = (nickname: string) => {
        return {
            type: 'loginPage/setNickname',
            payload: nickname
        }
    }

    setPassword = (password: string) => {
        return {
            type: 'loginPage/setPassword',
            payload: password
        }
    }
}