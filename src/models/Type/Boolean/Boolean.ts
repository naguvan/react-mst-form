import { IModelType, types, unprotect } from 'mobx-state-tree';
import { getParent, hasParent } from 'mobx-state-tree';
import { getSnapshot, applySnapshot } from 'mobx-state-tree';
export type __IModelType = IModelType<any, any>;

import { IBooleanConfig, IBoolean } from '@root/types';
import create from '../Value';

export const Boolean: IModelType<
    Partial<IBooleanConfig>,
    IBoolean
> = types
    .compose(
        'Boolean',
        create<boolean>('boolean', types.boolean, false),
        types.model({})
    )
    .actions(it => ({
        afterCreate() {}
    }));
