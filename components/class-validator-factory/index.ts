import {validate} from 'class-validator'

export declare type ObjectType<T> = {
    new (): T
}

export interface Obj {
    [x: string]: any
}

export default async <Entity extends Obj>(EntityClass: ObjectType<Entity>, value?: Entity & any, isUpdate = false): Promise<Entity> => {
    const entityInstance = new EntityClass()

    Object.keys(value).map(key => {
        entityInstance[key] = value[key]
    })

    const validateErrors = await validate(entityInstance, {
        // 更新操作不会验证没有涉及的字段
        skipMissingProperties: isUpdate
    })

    if (validateErrors.length > 0) {
        throw Error(validateErrors.toString())
    }

    return entityInstance
}