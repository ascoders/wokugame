import * as crypto from 'crypto'

type Utf8AsciiLatin1Encoding = 'utf8' | 'ascii' | 'latin1'
type HexBase64Latin1Encoding = 'latin1' | 'hex' | 'base64'
type Utf8AsciiBinaryEncoding = 'utf8' | 'ascii' | 'binary'
type HexBase64BinaryEncoding = 'binary' | 'base64' | 'hex'
type ECDHKeyFormat = 'compressed' | 'uncompressed' | 'hybrid'

export function hash(method: string, s: string|Buffer, format: HexBase64Latin1Encoding = 'hex') {
    const sum = crypto.createHash(method)
    const isBuffer = Buffer.isBuffer(s)
    if (!isBuffer && typeof s === 'object') {
        s = JSON.stringify(sortObject(s))
    }
    sum.update(s, isBuffer ? 'ascii' : 'utf8')
    return sum.digest(format)
}

export function md5(s: string|Buffer, format: HexBase64Latin1Encoding = 'hex') {
    return exports.hash('md5', s, format)
}

export function sha1(s: string|Buffer, format: HexBase64Latin1Encoding = 'hex') {
    return exports.hash('sha1', s, format)
}

export function sha256(s: string|Buffer, format: HexBase64Latin1Encoding = 'hex') {
    return exports.hash('sha256', s, format)
}

export function hmac(algorithm: string, key: string, data: string|Buffer, encoding: HexBase64Latin1Encoding) {
    encoding = encoding || 'base64'
    const hmac = crypto.createHmac(algorithm, key)
    hmac.update(data, Buffer.isBuffer(data) ? 'ascii' : 'utf8')
    return hmac.digest(encoding)
}

export function base64encode(s: string|Buffer, urlsafe: boolean) {
    if (!Buffer.isBuffer(s)) {
        s = new Buffer(s)
    }
    let encode = s.toString('base64')
    if (urlsafe) {
        encode = encode.replace(/\+/g, '-').replace(/\//g, '_')
    }
    return encode
}

export function base64decode(encodeStr: string, urlsafe: boolean, encoding: 'utf8'|'buffer' = 'utf8') {
    if (urlsafe) {
        encodeStr = encodeStr.replace(/\-/g, '+').replace(/_/g, '/')
    }
    const buf = new Buffer(encodeStr, 'base64')
    if (encoding === 'buffer') {
        return buf
    }
    return buf.toString(encoding)
}

function sortObject(o: any): any {
    if (!o || Array.isArray(o) || typeof o !== 'object') {
        return o
    }
    const keys = Object.keys(o)
    keys.sort()
    const values = []
    for (let i = 0; i < keys.length; i++) {
        const k = keys[i]
        values.push([k, sortObject(o[k])])
    }
    return values
}