import { IModelType, types, unprotect, ISimpleType } from 'mobx-state-tree';
import { getParent, hasParent } from 'mobx-state-tree';
import { getSnapshot, applySnapshot } from 'mobx-state-tree';
export type __IModelType = IModelType<any, any>;

import { IStringFieldConfig, IStringField } from '../types/Field';
import { create } from './TypeField';

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
