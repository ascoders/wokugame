"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.friendlyMillisecond = (millisecond) => {
    if (millisecond < 1000) {
        return `0 秒`;
    }
    if (millisecond >= 1000 && millisecond < 1000 * 60) {
        return `${Math.floor(millisecond / 1000)} 秒`;
    }
    if (millisecond >= 1000 * 60 && millisecond < 1000 * 60 * 60) {
        return `${Math.floor(millisecond / 1000 / 60)} 分钟`;
    }
    if (millisecond >= 1000 * 60 * 60 && millisecond < 1000 * 60 * 60 * 24) {
        return `${Math.floor(millisecond / 1000 / 60 / 60)} 小时`;
    }
    if (millisecond >= 1000 * 60 * 60 * 24) {
        return `${Math.floor(millisecond / 1000 / 60 / 60 / 24)} 天`;
    }
};
class Interval {
    constructor(callback, interval) {
        this.lastRunTime = new Date().getTime();
        this.hasStop = false;
        this.callback = callback;
        this.interval = interval;
        this.start();
    }
    start() {
        this.animationFrame = requestAnimationFrame(this.loop.bind(this));
        this.hasStop = false;
    }
    loop() {
        if (this.hasStop) {
            return;
        }
        const currentTime = new Date().getTime();
        if (currentTime - this.lastRunTime < this.interval) {
            return this.animationFrame = requestAnimationFrame(this.loop.bind(this));
        }
        this.lastRunTime = currentTime;
        this.callback();
        this.animationFrame = requestAnimationFrame(this.loop.bind(this));
    }
    stop() {
        cancelAnimationFrame(this.animationFrame);
        this.hasStop = true;
    }
}
exports.Interval = Interval;
//# sourceMappingURL=index.js.map