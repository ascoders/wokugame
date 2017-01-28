export default async <T>(url: string, options?: T) => {
    const result = await fetch(url, {
        method: 'post',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(options)
    })

    const body = await result.json()

    if (result.status >= 400) {
        return Promise.reject(body.message)
    }

    return body
}