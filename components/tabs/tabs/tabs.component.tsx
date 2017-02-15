import * as React from 'react'
import * as typings from './tabs.type'

import {Container, TitleContainer, PaneContainer, TabTitle} from './tabs.style'
import * as TabPaneTypings from '../tab-pane/tab-pane.type'

export default class TabsComponent extends React.Component<typings.Props, typings.State> {
    static defaultProps = new typings.Props()
    state = new typings.State()

    /**
     * 某个 tabTitle 被点击
     */
    handlePaneTitleClick = (index: number) => {
        this.setState({
            index
        })
    }

    /**
     * 渲染 tabPane 的 title
     */
    renderPaneTitle = (props: TabPaneTypings.Props, index: number) => {
        return (
            <TabTitle theme={{active:this.state.index===index}} onClick={this.handlePaneTitleClick.bind(this,index)}>
                {typeof props.title === 'string' ? props.title : props.title()}
            </TabTitle>
        )
    }

    /**
     * 渲染当前 tab 内容
     */
    renderCurrentPaneContent() {
        return React.Children.toArray(this.props.children)[this.state.index]
    }

    render() {
        // 遍历子元素，把 title 依次渲染出来
        const PaneTitles = React.Children.map(this.props.children, (children: React.ReactElement<TabPaneTypings.Props>, index: number) => {
            if (!children) {
                return null
            }
            return this.renderPaneTitle(children.props, index)
        })

        return (
            <Container>
                <TitleContainer>
                    {PaneTitles}
                </TitleContainer>

                <PaneContainer>
                    {this.renderCurrentPaneContent()}
                </PaneContainer>
            </Container>
        )
    }
}