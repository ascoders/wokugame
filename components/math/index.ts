/**
 * 精确除法
 */
export function division(arg1: number, arg2: number) {
    let t1 = 0
    let t2 = 0
    let r1
    let r2

    try {
        t1 = arg1.toString().split(".")[1].length
    } catch (e) {
    }

    try {
        t2 = arg2.toString().split(".")[1].length
    } catch (e) {
    }

    r1 = Number(arg1.toString().replace(".", ""))
    r2 = Number(arg2.toString().replace(".", ""))
    return (r1 / r2) * Math.pow(10, t2 - t1);
}