"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Timer {
    constructor() {
        this.currentTime = 0;
        this.timeLine = [];
        this.timeCount = 0;
    }
    createTimeNode(time, callback) {
        this.timeCount += time;
        this.timeLine.push({
            time: this.timeCount, callback
        });
    }
    setCurrentTime(time) {
        this.currentTime = time;
    }
    onUpdate() {
        this.currentTime += 1 / 60 * 1000;
        if (this.timeLine.length === 0) {
            return;
        }
        if (this.currentTime > this.timeLine[0].time + 100) {
            return this.timeLine.shift();
        }
        if (this.currentTime >= this.timeLine[0].time) {
            this.timeLine[0].callback();
            this.timeLine.shift();
        }
    }
}
exports.default = Timer;
//# sourceMappingURL=timer.js.map