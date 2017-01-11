import * as React from 'react'
import * as typings from './article-box.type'
const styles = require('./article-box.css')

export default (props: typings.PropsDefine = new typings.Props()) => {
    return (
        <div className={styles.container}>
            {/* 文章左侧容器 */}
            <div className={styles.leftContainer}>
                {/* 类别容器 */}
                <div className={styles.categoryContainer}>
                    话题12
                </div>
                {/* 标题容器 */}
                <div className={styles.titleContainer}>
                    标题
                </div>
                {/* 日期等杂项容器 */}
                <div className={styles.otherContainer}>
                    日期
                </div>
            </div>

            {/* 文章右侧容器 */}
            <div className={styles.rightContainer}></div>
        </div>
    )
}