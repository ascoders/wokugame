import {observable, action} from 'mobx'

class MenuStore {
    @observable height?: number = 46
}

export default class MenuAction {
    store = new MenuStore()

    @action.bound setHeight(height: number) {
        this.store.height = height
    }
}