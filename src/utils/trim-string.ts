export const trimStringEnd = (source: string, target: string) => {
    const targetIndex = source.indexOf(target)
    if (targetIndex === -1) {
        return source
    }
    if (target.length + targetIndex !== source.length) {
        // 不是最后一个
        return source
    }
    return source.slice(0, targetIndex)
}

export const trimStringStart = (source: string, target: string) => {
    const targetIndex = source.indexOf(target)
    if (targetIndex === -1) {
        return source
    }
    if (targetIndex !== 0) {
        // 不是第一
        return source
    }
    return source.slice(targetIndex + target.length)
}