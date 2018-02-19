import { IModelType, types, unprotect } from 'mobx-state-tree';
import { getParent, hasParent } from 'mobx-state-tree';
import { getSnapshot, applySnapshot } from 'mobx-state-tree';
export type __IModelType = IModelType<any, any>;

import { IStringFieldConfig, IStringField } from '../types/Field';
import { TypeField } from './TypeField';

export const StringField: IModelType<
    Partial<IStringFieldConfig>,
    IStringField
> = types
    .compose(
        TypeField,
        types.model('StringFieldProps', {
            type: types.literal('string'),
            minLength: types.optional(types.number, 0)
        })
    )
    .actions(it => ({
        afterCreate() {
            // it.type = 'string';
        }
    }));
