import * as React from 'react'
import {Link} from 'react-router'

export default class PageB extends React.Component<any,any> {
    state = {}

    constructor(props:any) {
        super(props)
    }

    componentDidMount() {
        document.title = 'page B'
    }

    render() {
        return (
            <div className="_namespace">
                <Link to="/">back</Link>
            </div>
        )
    }
}