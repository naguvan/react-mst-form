import { IModelType, types, unprotect } from 'mobx-state-tree';
import { getParent, hasParent } from 'mobx-state-tree';
import { getSnapshot, applySnapshot } from 'mobx-state-tree';
export type __IModelType = IModelType<any, any>;

import { INumberFieldConfig, INumberField } from '../types/Field';
import { TypeField } from './TypeField';

export const NumberField: IModelType<
    Partial<INumberFieldConfig>,
    INumberField
> = types
    .compose(
        TypeField,
        types.model('NumberFieldProps', {
            type: types.literal('number'),
            value: types.number,
            minimum: types.optional(types.number, Number.MIN_SAFE_INTEGER),
            maximum: types.optional(types.number, Number.MAX_SAFE_INTEGER)
        })
    )
    .actions(it => ({
        afterCreate() {
            // it.type = 'string';
        },

        setValue(value: number): void {
            it.value = value;
        }
    }));
