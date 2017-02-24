import * as React from 'react'

export default (origin: any, replaceFunction: (index: number) => React.ReactElement<any>) => {
    // 存储已扫描的字符串
    let strStore = ''

    // 第几次遇到变量
    let variableCount = 0

    // 字符串 react 数组
    const strElement: React.ReactElement<any>[] = []

    for (let index in origin) {
        const indexNumber = Number(index)

        // 遇到了 %
        if (origin[indexNumber] === '%') {
            if (indexNumber === origin.length - 1) {
                // 最后一个，没有含义，扔给后面处理
            } else {
                // 除了最后一个，都需要判断
                if (origin[indexNumber + 1] === 'd') {
                    // 下一个是 d
                    strElement.push((
                        <span key={indexNumber+'str'}>{strStore}</span>
                    ))
                    strStore = ''
                    strElement.push(replaceFunction(variableCount++))
                    continue
                } else {
                    // 下一个不是 d，不管了，扔给后面处理
                }
            }
        }

        // 遇到了 d
        if (origin[indexNumber] === 'd') {
            if (indexNumber === 0) {
                // 第一个，没有含义，扔给后面处理
            } else {
                // 除了第一个，都需要判断
                if (origin[indexNumber - 1] === '%') {
                    // 前一个是 %, 已经处理过了，这里不做处理
                    continue
                } else {
                    // 前一个不是 %，不管了，扔给后面处理处理
                }
            }
        }

        strStore += origin[indexNumber]

        // 兜底，如果是最后一个，还执行到了这里，字符串store还有值，那就显示出来
        if (indexNumber === origin.length - 1 && strStore !== '') {
            strElement.push((
                <span key={indexNumber}>{strStore}</span>
            ))
        }
    }

    return strElement
}