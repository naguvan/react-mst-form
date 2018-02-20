import { IModelType, types, unprotect } from 'mobx-state-tree';
import { getParent, hasParent } from 'mobx-state-tree';
import { getSnapshot, applySnapshot } from 'mobx-state-tree';
export type __IModelType = IModelType<any, any>;

import { IBooleanFieldConfig, IBooleanField } from '../types/Field';
import { create } from './ValueField';

export const BooleanField: IModelType<
    Partial<IBooleanFieldConfig>,
    IBooleanField
> = types
    .compose(
        'BooleanField',
        create<boolean>('boolean', types.boolean, false),
        types.model({})
    )
    .actions(it => ({
        afterCreate() {}
    }));
