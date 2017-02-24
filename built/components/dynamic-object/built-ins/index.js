"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const map_1 = require("./map");
const set_1 = require("./set");
const weak_map_1 = require("./weak-map");
const weak_set_1 = require("./weak-set");
exports.default = new Map([
    [Map, map_1.default],
    [Set, set_1.default],
    [WeakMap, weak_map_1.default],
    [WeakSet, weak_set_1.default],
    [Date, true],
    [RegExp, true]
]);
//# sourceMappingURL=index.js.map