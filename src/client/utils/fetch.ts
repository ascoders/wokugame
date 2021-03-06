export default async <T>(url: string, options?: RequestInit): Promise<T> => {
    const result = await fetch(url, Object.assign({}, {
        method: 'post',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        }
    }, options))

    const body = await result.json()

    if (result.status >= 400) {
        return Promise.reject(body.message)
    }

    return body
}