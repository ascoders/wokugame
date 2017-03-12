"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const typedi_1 = require("typedi");
const users_1 = require("./controllers/users");
const game_simulated_planet_1 = require("./controllers/game-simulated-planet");
const router = express.Router();
const wrap = (fn) => (...args) => fn(...args).catch(args[2]);
exports.default = () => {
    const users = typedi_1.Container.get(users_1.default);
    router.get('/user', wrap(users.getAuthenticatedUser));
    router.delete('/user', wrap(users.deleteAuthenticatedUser));
    router.get('/users', wrap(users.findAndCountAll));
    router.post('/users', wrap(users.create));
    router.post('/users/login', wrap(users.login));
    const gameSimulatedPlanet = typedi_1.Container.get(game_simulated_planet_1.default);
    router.post('/game-simulated-planet/collection', wrap(gameSimulatedPlanet.collection));
    router.get('/game-simulated-planet/user', wrap(gameSimulatedPlanet.getAuthenticatedUser));
    router.post('/game-simulated-planet/building', wrap(gameSimulatedPlanet.building));
    router.delete('/game-simulated-planet/building/:buildingId', wrap(gameSimulatedPlanet.destroyBuilding));
    router.post('/game-simulated-planet/building/:buildingId/upgrade', wrap(gameSimulatedPlanet.upgradeBuilding));
    router.post('/game-simulated-planet/designWarship', wrap(gameSimulatedPlanet.designWarship));
    router.get('/game-simulated-planet/planet/:planetId/warships', wrap(gameSimulatedPlanet.getWarships));
    router.post('/game-simulated-planet/warship/delete', wrap(gameSimulatedPlanet.deleteWarship));
    return router;
};
//# sourceMappingURL=routes.js.map