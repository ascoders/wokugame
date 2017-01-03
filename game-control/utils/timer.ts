export interface TimeNode {
    time: number
    callback: Function
}

export default class Timer {
    // 当前时间
    private currentTime = 0

    // 上一次本地时间
    private lastLocalTime = new Date().getTime()

    // 时间节点线
    private timeLine: TimeNode[] = []

    // 累计时间线时间
    private timeCount = 0

    // 创建一个时间节点
    public createTimeNode(time: number, callback: Function) {
        this.timeCount += time
        this.timeLine.push({
            time: this.timeCount, callback
        })
    }

    // 设置当前时间
    public setCurrentTime(time: number) {
        this.currentTime = time
    }

    // 在游戏循环中执行
    public onUpdate() {
        // 当前时间累加
        const currentTime = new Date().getTime()
        const timeOffset = currentTime - this.lastLocalTime
        this.lastLocalTime = currentTime
        this.currentTime += timeOffset

        if (this.timeLine.length === 0) {
            return
        }

        // 超过 100 毫秒直接过期
        if (this.currentTime > this.timeLine[0].time + 100) {
            return this.timeLine.shift()
        }

        // 如果执行到最近的时间，执行它的方法，并推出
        if (this.currentTime >= this.timeLine[0].time) {
            this.timeLine[0].callback()
            this.timeLine.shift()
        }
    }
}