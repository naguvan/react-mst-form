import { IModelType, types, unprotect } from 'mobx-state-tree';
import { getParent, hasParent } from 'mobx-state-tree';
import { getSnapshot, applySnapshot } from 'mobx-state-tree';
export type __IModelType = IModelType<any, any>;

import { IColorConfig, IColor } from '@root/types';
import create from '../Value';

export const Color: IModelType<Partial<IColorConfig>, IColor> = types
    .compose(
        'Color',
        create<string>('color', types.string, ''),
        types.model({})
    )
    .actions(it => ({
        afterCreate() {}
    }));
