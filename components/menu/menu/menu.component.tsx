import * as React from 'react'
import * as typings from './menu.type'
import {createStore, Store} from 'redux'
import {Provider} from 'react-redux'
import {default as reducer, IState} from '../reducers'
const styles = require('./menu.css')

export default class Menu extends React.Component<typings.Props, any> {
    static defaultProps = new typings.Props()

    private store: Store<IState>

    componentWillMount() {
        this.store = createStore(reducer)

        if (this.props.height) {
            this.store.dispatch({
                type: 'setHeight',
                payload: this.props.height
            })
        }
    }

    render() {
        return (
            <Provider store={this.store}>
                <div className={styles.container} style={{height:this.store.getState().height}}>
                    {this.props.children}
                </div>
            </Provider>
        )
    }
}