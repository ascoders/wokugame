import { inject } from '../dependency-inject'

export class Store {
    height = 40
}

export class Action {
    @inject(Store)
    private store: Store

    setHeight(height: number) {
        this.store.height = height
    }
}