import { IModelType, types, unprotect, ISimpleType } from 'mobx-state-tree';
import { getParent, hasParent } from 'mobx-state-tree';
import { getSnapshot, applySnapshot } from 'mobx-state-tree';
export type __IModelType = IModelType<any, any>;

import { IStringFieldConfig, IStringField } from '../types/Field';
import { create } from './TypeField';

function createGenericModel<T>(
    type: string,
    kind: ISimpleType<T>,
    defaultv: T
) {
    return types
        .model('createGenericModel', {
            type: types.literal(type),
            value: types.optional(kind, defaultv),
            default: types.optional(kind, defaultv),
            initial: types.optional(kind, defaultv)
        })
        .actions(it => ({
            afterCreate() {
                it.initial = it.value;
            },
            setValue(value: T): void {
                it.value = value;
            },
            reset(): void {
                it.value = it.initial;
            }
        }));
}

export const StringField: IModelType<
    Partial<IStringFieldConfig>,
    IStringField
> = types
    .compose(
        'StringField',
        create<string>('string', types.string, ''),
        types.model({
            minLength: types.optional(types.number, 0)
        })
    )
    .actions(it => ({
        afterCreate() {}
    }));
