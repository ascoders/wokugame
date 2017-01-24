"use strict";
const crypto = require("crypto");
function hash(method, s, format = 'hex') {
    const sum = crypto.createHash(method);
    const isBuffer = Buffer.isBuffer(s);
    if (!isBuffer && typeof s === 'object') {
        s = JSON.stringify(sortObject(s));
    }
    sum.update(s, isBuffer ? 'ascii' : 'utf8');
    return sum.digest(format);
}
exports.hash = hash;
function md5(s, format = 'hex') {
    return exports.hash('md5', s, format);
}
exports.md5 = md5;
function sha1(s, format = 'hex') {
    return exports.hash('sha1', s, format);
}
exports.sha1 = sha1;
function sha256(s, format = 'hex') {
    return exports.hash('sha256', s, format);
}
exports.sha256 = sha256;
function hmac(algorithm, key, data, encoding) {
    encoding = encoding || 'base64';
    const hmac = crypto.createHmac(algorithm, key);
    hmac.update(data, Buffer.isBuffer(data) ? 'ascii' : 'utf8');
    return hmac.digest(encoding);
}
exports.hmac = hmac;
function base64encode(s, urlsafe) {
    if (!Buffer.isBuffer(s)) {
        s = new Buffer(s);
    }
    let encode = s.toString('base64');
    if (urlsafe) {
        encode = encode.replace(/\+/g, '-').replace(/\//g, '_');
    }
    return encode;
}
exports.base64encode = base64encode;
function base64decode(encodeStr, urlsafe, encoding = 'utf8') {
    if (urlsafe) {
        encodeStr = encodeStr.replace(/\-/g, '+').replace(/_/g, '/');
    }
    const buf = new Buffer(encodeStr, 'base64');
    if (encoding === 'buffer') {
        return buf;
    }
    return buf.toString(encoding);
}
exports.base64decode = base64decode;
function sortObject(o) {
    if (!o || Array.isArray(o) || typeof o !== 'object') {
        return o;
    }
    const keys = Object.keys(o);
    keys.sort();
    const values = [];
    for (let i = 0; i < keys.length; i++) {
        const k = keys[i];
        values.push([k, sortObject(o[k])]);
    }
    return values;
}
//# sourceMappingURL=crypto.js.map