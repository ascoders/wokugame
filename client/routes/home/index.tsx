import * as React from 'react'
import {Link} from 'react-router'
import {connect} from 'fit-isomorphic-redux-tools'

@connect(
    (state: any) => {
        return {
            userStore: state.user.toJS()
        }
    }, {}
)
export default class Home extends React.Component<any,any> {
    state = {}

    constructor(props: any) {
        super(props)
    }

    componentWillMount() {

    }

    componentDidMount() {
        document.title = 'React & nodejs'
    }

    render() {
        const {userStore} = this.props
        return (
            <div className="_namespace">
                <div className="title">React run well V15.0.1</div>
                <p>访问 chrome 商店,<a target="_blank"
                                   href="https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?utm_source=chrome-ntp-icon">下载 Redux DevTools 插件</a>,随时查看页面状态树
                </p>
                <p>
                    <Link to="/page-a">html5路由一</Link>
                    <Link to="/page-b"
                          style={{marginLeft:10}}>html5路由二</Link>
                </p>
            </div>
        )
    }
}