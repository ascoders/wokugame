export const HEADER_COLOR = 'HEADER_COLOR'

export function locationChange(color: string) {
    return {
        type: HEADER_COLOR,
        payload: color
    }
}