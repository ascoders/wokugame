"use strict";
const fs = require('fs');
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (path) => {
    const walk = function (path) {
        const files = fs.readdirSync(path);
        files.forEach(function (item) {
            var tmpPath = path + '/' + item, stats = fs.statSync(tmpPath);
            if (stats.isDirectory()) {
                walk(tmpPath);
            }
            else if (stats.isFile()) {
                require(tmpPath).default;
            }
        });
    };
    walk(path);
};
