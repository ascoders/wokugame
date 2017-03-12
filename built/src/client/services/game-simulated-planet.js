"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fetch_1 = require("../utils/fetch");
exports.getAuthenticatedUser = () => __awaiter(this, void 0, void 0, function* () {
    return yield fetch_1.default('/api/game-simulated-planet/user', {
        method: 'get'
    });
});
exports.collection = (planetId) => __awaiter(this, void 0, void 0, function* () {
    return yield fetch_1.default('/api/game-simulated-planet/collection', {
        method: 'post',
        body: JSON.stringify({
            planetId
        })
    });
});
exports.building = (planetId, buildingName) => __awaiter(this, void 0, void 0, function* () {
    return yield fetch_1.default('/api/game-simulated-planet/building', {
        method: 'post',
        body: JSON.stringify({
            planetId,
            type: buildingName
        })
    });
});
exports.destroyBuilding = (planetId, buildingId) => __awaiter(this, void 0, void 0, function* () {
    return yield fetch_1.default('/api/game-simulated-planet/building/' + buildingId, {
        method: 'delete',
        body: JSON.stringify({
            planetId
        })
    });
});
exports.upgradeBuilding = (planetId, buildingId) => __awaiter(this, void 0, void 0, function* () {
    return yield fetch_1.default('/api/game-simulated-planet/building/' + buildingId + '/upgrade', {
        method: 'post',
        body: JSON.stringify({
            planetId
        })
    });
});
exports.designWarship = (planetId, warship) => __awaiter(this, void 0, void 0, function* () {
    return yield fetch_1.default('/api/game-simulated-planet/designWarship', {
        method: 'post',
        body: JSON.stringify({
            planetId, warship
        })
    });
});
exports.getDesignWarship = (planetId) => __awaiter(this, void 0, void 0, function* () {
    return yield fetch_1.default(`/api/game-simulated-planet/planet/${planetId}/warships`, {
        method: 'get'
    });
});
exports.deleteWarship = (warshipId) => __awaiter(this, void 0, void 0, function* () {
    return yield fetch_1.default('/api/game-simulated-planet/warship/delete', {
        method: 'post',
        body: JSON.stringify({
            warshipId
        })
    });
});
//# sourceMappingURL=game-simulated-planet.js.map