"use strict";
const fs = require("fs");
function DllHashPlugin() {
}
function changeFileDll(path, hash) {
    let html = fs.readFileSync(path).toString();
    html = html.replace(/\/dll\/library\.([0-9a-zA-Z]){0,5}\.dll\.js/g, `/dll/library.${hash}.dll.js`);
    fs.writeFileSync(path, html);
}
DllHashPlugin.prototype.apply = function (compiler) {
    compiler.plugin('done', (stats) => {
        const hash = stats.hash.slice(0, 5);
        changeFileDll('src/client/html.ts', hash);
        changeFileDll('built/src/client/html.js', hash);
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DllHashPlugin;
//# sourceMappingURL=dll-production-change-html-hash.js.map