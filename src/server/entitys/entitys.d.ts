declare namespace Entitys {
    export interface User {
        id: number
        nickname: string
        password: string
        passwordRetry: number
        email: string
        created: Date
        updated: Date
        gameSimulatedPlanetUser: GameSimulatedPlanetUser
    }

    export interface GameSimulatedPlanetUser {
        id: number
        user: User
        progress: number
        hasReadProgress: boolean
        planets: GameSimulatedPlanetPlanet[]
        lastHarvest: Date
    }

    export interface GameSimulatedPlanetPlanet {
        id: number
        gameUser: GameSimulatedPlanetUser
        population: number
        crystal: number
        gas: number
        progress: number
        size: number
        buildings: GameSimulatedPlanetBuilding[]
        lastCollection: Date
    }

    export interface GameSimulatedPlanetBuilding {
        id: number
        planet: GameSimulatedPlanetPlanet
        type: string
        level: number
        buildStart: Date
        created: Date
    }
}