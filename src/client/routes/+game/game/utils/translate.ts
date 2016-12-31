export interface Position {
    x: number
    y: number
}

export function translateMovement(from: Position, to: Position, speed: number): Position {
    // 先计算两点间距离
    const distance = Math.sqrt(Math.pow(Math.abs(from.x - to.x), 2) + Math.pow(Math.abs(from.y - to.y), 2))

    // 如果距离小于 1，认为已经到达
    if (distance < 1) {
        return {
            x: 0,
            y: 0
        }
    }

    // x，y 移动位移按照比例来
    const xMoveMoment = speed / distance * (to.x - from.x)
    const yMoveMoment = speed / distance * (to.y - from.y)

    // 如果这次位移就可以到达，则会选择补间距离
    const residualX = to.x - from.x
    const residualY = to.y - from.y

    return {
        x: Math.abs(residualX) < Math.abs(xMoveMoment) ? residualX : xMoveMoment,
        y: Math.abs(residualY) < Math.abs(yMoveMoment) ? residualY : yMoveMoment
    }
}