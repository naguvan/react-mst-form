import { IModelType, types, unprotect } from 'mobx-state-tree';
import { getParent, hasParent } from 'mobx-state-tree';
import { getSnapshot, applySnapshot } from 'mobx-state-tree';
export type __IModelType = IModelType<any, any>;

import { INullConfig, INull } from '@root/types';
import create from '../Value';

export const Null: IModelType<Partial<INullConfig>, INull> = types
    .compose(
        'Null',
        create<null>('null', types.null, null),
        types.model({})
    );
