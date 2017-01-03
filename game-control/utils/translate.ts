import * as PIXI from 'pixi.js'

export interface Position {
    x: number
    y: number
}

/**
 * 从起点移动到终点，下一帧 x y 应该如何变化
 */
export function translateMovement(from: Position, to: Position, speed = 10): Position {
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

/**
 * 到某一方向，下一帧 x y 应该如何变化
 * 0 向上，180 向下
 */
export function directionMovement(direction: number, speed = 10) {
    // 360 度以内的方向
    const minDirection = direction % 360

    // 转换为正弦度数
    const sin = 90 - minDirection

    // 换成弧度
    const radian = 2 * Math.PI / 360 * sin

    // y 轴偏移量 = 正弦值 * 斜边
    const yMoveMoment = -Math.sin(radian) * speed
    // x 轴偏移量 = 余弦值 * 斜边
    const xMoveMoment = Math.cos(radian) * speed

    return {
        x: xMoveMoment,
        y: yMoveMoment
    }
}

/**
 * 判断两个点是否相撞
 */
export function isHit(r1: PIXI.Container, r2: PIXI.Container) {
    // hit will determine whether there's a collision
    let hit = false

    // Find the center points of each sprite
    const r1centerX = r1.getBounds().x + r1.width / 2
    const r1centerY = r1.getBounds().y + r1.height / 2
    const r2centerX = r2.getBounds().x + r2.width / 2
    const r2centerY = r2.getBounds().y + r2.height / 2

    // Find the half-widths and half-heights of each sprite
    const r1halfWidth = r1.width / 2
    const r1halfHeight = r1.height / 2
    const r2halfWidth = r2.width / 2
    const r2halfHeight = r2.height / 2

    // Calculate the distance vector between the sprites
    const vx = Math.abs(r1centerX - r2centerX)
    const vy = Math.abs(r1centerY - r2centerY)

    // Figure out the combined half-widths and half-heights
    const combinedHalfWidths = r1halfWidth + r2halfWidth
    const combinedHalfHeights = r1halfHeight + r2halfHeight

    //console.log(vx, vy, combinedHalfWidths, combinedHalfHeights)

    // Check for a collision on the x axis
    if (vx < combinedHalfWidths) {
        // A collision might be occuring. Check for a collision on the y axis
        if (vy < combinedHalfHeights) {
            // There's definitely a collision happening
            hit = true
        } else {
            // There's no collision on the y axis
            hit = false
        }
    } else {
        // There's no collision on the x axis
        hit = false
    }

    // `hit` will be either `true` or `false`
    return hit
}