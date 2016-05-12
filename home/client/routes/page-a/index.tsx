import * as React from 'react'
import {Link} from 'react-router'

export default class PageA extends React.Component<any,any> {
    state = {}

    constructor(props:any) {
        super(props)
    }

    componentDidMount() {
        document.title = 'page A'
    }

    render() {
        return (
            <div className="_namespace">
                <Link to="/">back</Link>
            </div>
        )
    }
}