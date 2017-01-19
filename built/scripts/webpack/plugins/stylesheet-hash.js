"use strict";
const fs = require("fs");
function makeHash() {
    let text = '';
    const possible = 'abcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}
function changeFileBundle(path, hash) {
    let html = fs.readFileSync(path).toString();
    html = html.replace(/\/styles\/main\.([0-9a-zA-Z]){0,5}\.css/g, `/styles/main.${hash}.css`);
    fs.writeFileSync(path, html);
}
function styleSheetHash() {
    const hash = makeHash();
    changeFileBundle('src/client/html.ts', hash);
    changeFileBundle('built/src/client/html.js', hash);
    return `styles/main.${hash}.css`;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = styleSheetHash;
//# sourceMappingURL=stylesheet-hash.js.map