import ReduxComponent from '../../../../components/redux-component'
import User from '../../stores/user'
import RegisterPage from '../../stores/register.page'

export class Props extends ReduxComponent {
    /**
     * [injected]
     */
    User?: User
    /**
     * [injected]
     */
    RegisterPage?: RegisterPage
}