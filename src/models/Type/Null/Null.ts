import { IModelType, types, unprotect } from 'mobx-state-tree';
import { getParent, hasParent } from 'mobx-state-tree';
import { getSnapshot, applySnapshot } from 'mobx-state-tree';
export type __IModelType = IModelType<any, any>;

import { INullConfig, INull } from '@root/types';
import createValue from '../Value';

export const Null: IModelType<Partial<INullConfig>, INull> = types.compose(
    'Null',
    createValue<null, 'null'>('null', types.null, null),
    types.model({})
);
