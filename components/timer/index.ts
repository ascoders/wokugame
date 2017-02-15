/**
 * 友好的显示毫秒
 */
export const friendlyMillisecond = (millisecond: number) => {
    if (millisecond < 1000) {
        return `0 秒`
    }

    if (millisecond >= 1000 && millisecond < 1000 * 60) {
        return `${Math.floor(millisecond / 1000)} 秒`
    }

    if (millisecond >= 1000 * 60 && millisecond < 1000 * 60 * 60) {
        return `${Math.floor(millisecond / 1000 / 60)} 分钟`
    }

    if (millisecond >= 1000 * 60 * 60 && millisecond < 1000 * 60 * 60 * 24) {
        return `${Math.floor(millisecond / 1000 / 60 / 60)} 小时`
    }

    if (millisecond >= 1000 * 60 * 60 * 24) {
        return `${Math.floor(millisecond / 1000 / 60 / 60 / 24)} 天`
    }
}

export class Interval {
    private interval: number
    private callback: Function
    private animationFrame: number

    // 上次执行时间
    private lastRunTime = new Date().getTime()

    // 是否 stop
    private hasStop = false

    constructor(callback: Function, interval: number) {
        this.callback = callback
        this.interval = interval
        this.start()
    }

    private start() {
        this.animationFrame = requestAnimationFrame(this.loop.bind(this))
        this.hasStop = false
    }

    private loop() {
        if (this.hasStop) {
            return
        }

        const currentTime = new Date().getTime()
        if (currentTime - this.lastRunTime < this.interval) {
            return this.animationFrame = requestAnimationFrame(this.loop.bind(this))
        }
        this.lastRunTime = currentTime

        this.callback()

        // 无限循环
        this.animationFrame = requestAnimationFrame(this.loop.bind(this))
    }

    public stop() {
        cancelAnimationFrame(this.animationFrame)
        this.hasStop = true
    }
}