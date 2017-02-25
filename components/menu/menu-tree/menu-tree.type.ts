import { StoreProps } from '../store'

export class Props extends StoreProps {
    /**
     * 子菜单标题
     */
    title?: string | (() => React.ReactElement<any>) = ''
}