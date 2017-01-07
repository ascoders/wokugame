"use strict";
function translateMovement(from, to, speed = 10) {
    const distance = Math.sqrt(Math.pow(Math.abs(from.x - to.x), 2) + Math.pow(Math.abs(from.y - to.y), 2));
    if (distance < 1) {
        return {
            x: 0,
            y: 0
        };
    }
    const xMoveMoment = speed / distance * (to.x - from.x);
    const yMoveMoment = speed / distance * (to.y - from.y);
    const residualX = to.x - from.x;
    const residualY = to.y - from.y;
    return {
        x: Math.abs(residualX) < Math.abs(xMoveMoment) ? residualX : xMoveMoment,
        y: Math.abs(residualY) < Math.abs(yMoveMoment) ? residualY : yMoveMoment
    };
}
exports.translateMovement = translateMovement;
function directionMovement(direction, speed = 10) {
    const minDirection = direction % 360;
    const sin = 90 - minDirection;
    const radian = 2 * Math.PI / 360 * sin;
    const yMoveMoment = -Math.sin(radian) * speed;
    const xMoveMoment = Math.cos(radian) * speed;
    return {
        x: xMoveMoment,
        y: yMoveMoment
    };
}
exports.directionMovement = directionMovement;
function isHit(r1, r2) {
    let hit = false;
    const r1centerX = r1.getBounds().x + r1.width / 2;
    const r1centerY = r1.getBounds().y + r1.height / 2;
    const r2centerX = r2.getBounds().x + r2.width / 2;
    const r2centerY = r2.getBounds().y + r2.height / 2;
    const r1halfWidth = r1.width / 2;
    const r1halfHeight = r1.height / 2;
    const r2halfWidth = r2.width / 2;
    const r2halfHeight = r2.height / 2;
    const vx = Math.abs(r1centerX - r2centerX);
    const vy = Math.abs(r1centerY - r2centerY);
    const combinedHalfWidths = r1halfWidth + r2halfWidth;
    const combinedHalfHeights = r1halfHeight + r2halfHeight;
    if (vx < combinedHalfWidths) {
        if (vy < combinedHalfHeights) {
            hit = true;
        }
        else {
            hit = false;
        }
    }
    else {
        hit = false;
    }
    return hit;
}
exports.isHit = isHit;
//# sourceMappingURL=translate.js.map