"use strict";
const fs = require("fs");
function BundleHashPlugin() {
}
function changeFileBundle(path, hash) {
    let html = fs.readFileSync(path).toString();
    html = html.replace(/\/bundle\.([0-9a-zA-Z]){0,5}\.js/g, `/bundle.${hash}.js`);
    fs.writeFileSync(path, html);
}
BundleHashPlugin.prototype.apply = function (compiler) {
    compiler.plugin('done', (stats) => {
        const hash = stats.hash.slice(0, 5);
        changeFileBundle('src/client/html.ts', hash);
        changeFileBundle('built/src/client/html.js', hash);
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BundleHashPlugin;
//# sourceMappingURL=bundle-production-change-html-hash.js.map