"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (gameUser, buildingHelper) => {
    switch (gameUser.progress) {
        case 0:
            if (gameUser.planets.findIndex(planet => planet.crystal >= 50) > -1) {
                gameUser.progress = 1;
            }
            break;
        case 1:
            if (gameUser.planets.filter(planet => {
                return planet.buildings.filter(building => building.type === 'house')
                    .filter(building => buildingHelper.getFinishedTime(building) > 0)
                    .length >= 5;
            }).length >= 1) {
                gameUser.progress = 2;
            }
            break;
        case 2:
            if (gameUser.planets.filter(planet => {
                return planet.buildings.filter(building => building.type === 'crystal')
                    .filter(building => buildingHelper.getFinishedTime(building) > 0)
                    .length >= 5;
            }).length >= 1) {
                gameUser.progress = 3;
            }
            break;
    }
};
//# sourceMappingURL=upgrade-user-progress.js.map