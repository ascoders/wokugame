import ReactProps from '@gaea/react-props'

export class Props extends ReactProps {
    /**
     * 子菜单标题
     */
    title?: string | (() => React.ReactElement<any>) = ''
}