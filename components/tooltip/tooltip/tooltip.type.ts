import * as React from 'react'
import {CSSProperties} from 'react'

export type Position = 'left' | 'top' | 'right' | 'bottom'

export type ShowType = 'hover' | 'click'

export interface PropsDefine {
    /**
     * 文字内容
     */
    title?: string | (() => React.ReactElement<any>)

    /**
     * 文字内容自定义渲染, 如果不设置文字内容, 此项生效
     * 与 title 不同, 此项可以返回一个 reactElement 对象, 显示复杂内容
     */
    titleRender?: () => React.ReactElement<any>

    /**
     * 期望位置
     * 但如果期望位置放不下了，将会自动找一个合适的位置替代
     */
    position?: Position

    /**
     * 工具栏纵向层级
     */
    zIndex?: number

    /**
     * 遮罩层纵向层级
     */
    shadowZIndex?: number

    /**
     * 遮罩层样式
     */
    shadowStyle?: CSSProperties

    /**
     * 出现方式
     */
        type?: ShowType

    /**
     * 是否显示 tooltip 时同时显示遮罩层
     */
    showShadow?: boolean

    /**
     * 弹层无样式
     */
    simple?: boolean
}

export class Props implements PropsDefine {
    title = 'toolTip'
    zIndex = 102
    shadowZIndex = 101
    position = 'top' as Position
    type = 'hover' as ShowType
    showShadow = false
    simple = false
}

export interface StateDefine {
    /**
     * 子元素相对父级的位置
     */
    childrenTop?: number
    childrenLeft?: number
    childrenWidth?: number
    childrenHeight?: number

    /**
     * tooltip 宽高
     */
    tooltipWidth?: number
    tooltipHeight?: number

    /**
     * 是否显示 tooltip
     */
    show?: boolean
}

export class State implements StateDefine {
    childrenTop = 0
    childrenLeft = 0
    childrenWidth = 0
    childrenHeight = 0

    tooltipWidth = 0
    tooltipHeight = 0

    show = false
}