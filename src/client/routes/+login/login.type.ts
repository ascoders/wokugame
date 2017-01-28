import ReduxComponent from '../../../../components/redux-component'
import User from '../../stores/user'
import LoginPage from '../../stores/login.page'

export class Props extends ReduxComponent {
    /**
     * [injected]
     */
    User?: User
    /**
     * [injected]
     */
    LoginPage?: LoginPage
}