"use strict";
const fs = require('fs');
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (path) => {
    const walk = function (path, deep) {
        const files = fs.readdirSync(path);
        files.forEach(function (item) {
            var tmpPath = path + '/' + item, stats = fs.statSync(tmpPath);
            if (stats.isDirectory() && deep !== 1) {
                walk(tmpPath, 1);
            }
            else if (stats.isFile()) {
                if (item === 'index.js') {
                    require(tmpPath).default;
                }
            }
        });
    };
    walk(path, 0);
};
