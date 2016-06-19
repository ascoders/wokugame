"use strict";
const fs = require('fs');
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (path) => {
    const fileList = [];
    const walk = function (path, folderList, deep) {
        const files = fs.readdirSync(path);
        files.forEach(function (item) {
            var tmpPath = path + '/' + item, stats = fs.statSync(tmpPath);
            if (stats.isDirectory() && deep !== 1) {
                walk(tmpPath, fileList, 1);
            }
            else if (stats.isFile()) {
                if (item === 'index.js') {
                    fileList.push(tmpPath);
                }
            }
        });
    };
    walk(path, fileList, 0);
    return fileList;
};
