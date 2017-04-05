import ReactProps from '@gaea/react-props'

export class Props extends ReactProps {
    /**
     * 是否显示模态框
     */
    show?: boolean = false

    /**
     * 模态框标题
     */
    title?: string = null

    /**
     * 点击遮罩层是否会触发关闭
     */
    backdropClickToClose?: boolean = true

    /**
     * 关闭的回调
     */
    onClose?: () => void = () => {
    }
}

export class State {

}