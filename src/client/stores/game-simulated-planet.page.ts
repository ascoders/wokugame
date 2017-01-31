import {observable} from 'mobx'
import asyncAction from '../mobx-async-action'

class UserStore {
    /**
     * 主态用户
     */
    @observable currentUser?: any
}

export default class User {
    store = new UserStore()

}