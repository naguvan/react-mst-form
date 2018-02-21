import { IModelType, types, unprotect } from 'mobx-state-tree';
import { getParent, hasParent } from 'mobx-state-tree';
import { getSnapshot, applySnapshot } from 'mobx-state-tree';
export type __IModelType = IModelType<any, any>;

import { INumberConfig, INumber } from '@root/types';
import { create } from '../value/Value';
import { MAX_SAFE_INTEGER, MIN_SAFE_INTEGER } from '../../../utils';

export const Number: IModelType<Partial<INumberConfig>, INumber> = types
    .compose(
        'Number',
        create<number>('number', types.number, 0),
        types.model({
            minimum: types.optional(types.number, MIN_SAFE_INTEGER),
            maximum: types.optional(types.number, MAX_SAFE_INTEGER)
        })
    )
    .actions(it => ({
        afterCreate() {
            // it.type = 'string';
        }
    }));
