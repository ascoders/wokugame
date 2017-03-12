declare namespace Entitys {
    /**
     * 网站用户
     */
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

    /**
     * 游戏用户
     */
    export interface GameSimulatedPlanetUser {
        id: number
        user: User
        progress: number
        hasReadProgress: boolean
        planets: GameSimulatedPlanetPlanet[]
        lastHarvest: Date
    }

    /**
     * 游戏星球
     */
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

    /**
     * 游戏建筑
     */
    export interface GameSimulatedPlanetBuilding {
        id: number
        planet: GameSimulatedPlanetPlanet
        type: string
        level: number
        buildStart: Date
        created: Date
    }

    /**
     * 游戏战舰
     */
    export interface GameSimulatedPlanetWarship {
        id?: number
        name: string
        key: string
        equipments: Array<{
            key: string
            count: number
        }>
        count?: number
    }
}