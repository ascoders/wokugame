/**
 * 增、更新操作时拦截自定义的校验
 */

import {validate, ValidationError} from 'class-validator'
import {EventSubscriber, EntitySubscriberInterface, InsertEvent, UpdateEvent} from 'typeorm'

function getErrorMessage(validateErrors: ValidationError[]) {
    let message = ''
    validateErrors.forEach(error => {
        const reasons = Object.keys(error.constraints).map(constraintKey => {
            return error.constraints[constraintKey]
        }).join(' ')
        message += `字段 ${error.property} ${reasons}, 当前值为 ${error.value}`
    })
    return message
}

@EventSubscriber()
export class EverythingSubscriber implements EntitySubscriberInterface<any> {

    async beforeInsert(event: InsertEvent<any>) {
        const validateErrors = await validate(event.entity)
        if (validateErrors.length > 0) {
            return Promise.reject({
                status: 403,
                message: getErrorMessage(validateErrors),
                error: validateErrors
            })
        }
    }

    async beforeUpdate(event: UpdateEvent<any>) {
        const validateErrors = await validate(event.entity, {
            // 更新操作不会验证没有涉及的字段
            skipMissingProperties: true
        })
        if (validateErrors.length > 0) {
            return Promise.reject({
                status: 403,
                message: getErrorMessage(validateErrors),
                error: validateErrors
            })
        }
    }

}