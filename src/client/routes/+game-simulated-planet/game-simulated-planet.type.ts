import * as React from 'react'
import User from '../../stores/user'

export interface PropsDefine {
    /**
     * [injected]
     */
    User?: User
}

export class Props implements PropsDefine {

}