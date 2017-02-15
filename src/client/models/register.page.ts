import {model, Iaction} from '../../../components/reax'

export class RegisterPageStore {
    nickname = ''
    password = ''
}

export const RegisterPageModel = model<RegisterPageStore>({
    namespace: 'registerPage',
    state: new RegisterPageStore(),
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

export class RegisterPageActions {
    setNickname = (nickname: string) => {
        return {
            type: 'registerPage/setNickname',
            payload: nickname
        }
    }

    setPassword = (password: string) => {
        return {
            type: 'registerPage/setPassword',
            payload: password
        }
    }
}