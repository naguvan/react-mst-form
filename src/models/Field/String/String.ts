import { IModelType, types, unprotect, ISimpleType } from 'mobx-state-tree';
import { getParent, hasParent } from 'mobx-state-tree';
import { getSnapshot, applySnapshot } from 'mobx-state-tree';
export type __IModelType = IModelType<any, any>;

import { IStringConfig, IString } from '@root/types';
import { create } from '../value/Value';

export const String: IModelType<
    Partial<IStringConfig>,
    IString
> = types
    .compose(
        'String',
        create<string>('string', types.string, ''),
        types.model({
            minLength: types.optional(types.number, 0)
        })
    )
    .actions(it => ({
        afterCreate() {}
    }));
