import { IModelType, types, unprotect } from 'mobx-state-tree';
import { getParent, hasParent } from 'mobx-state-tree';
import { getSnapshot, applySnapshot } from 'mobx-state-tree';
export type __IModelType = IModelType<any, any>;

import { IBooleanFieldConfig, IBooleanField } from '../types/Field';
import { TypeField } from './TypeField';

export const BooleanField: IModelType<
    Partial<IBooleanFieldConfig>,
    IBooleanField
> = types
    .compose(
        TypeField,
        types.model('BooleanFieldProps', {
            type: types.literal('boolean')
        })
    )
    .actions(it => ({
        afterCreate() {}
    }));
