import { inject, Container } from 'dependency-inject'
import ReactProps from '@gaea/react-props'

export class menuStore {
    height = 40
}

export class menuAction {
    @inject(menuStore)
    private store: menuStore

    setHeight(height: number) {
        this.store.height = height
    }
}

export class StoreProps extends ReactProps {
    public menuAction?: menuAction
    public menuStore?: menuStore

    constructor() {
        super()
        const container = new Container()
        container.set(menuStore, new menuStore())
        container.set(menuAction, new menuAction())

        this.menuAction = container.get(menuAction)
        this.menuStore = container.get(menuStore)
    }
}