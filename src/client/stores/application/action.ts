import {UsersService} from '../../services'
import ApplicationStore from './store'
import {inject} from '../../../../components/dependency-inject'

export default class ApplicationAction {
    @inject(ApplicationStore)
    private store: ApplicationStore

    /**
     * 设置是否禁止网站最外层滚动条
     */
    showScroll(show: boolean) {
        this.store.noScroll = !show
    }
}