import { IModelType, types, unprotect, ISimpleType } from 'mobx-state-tree';
import { getParent, hasParent } from 'mobx-state-tree';
import { getSnapshot, applySnapshot } from 'mobx-state-tree';
export type __IModelType = IModelType<any, any>;

import { IEnumConfig, IEnum } from '@root/types';
import create from '../Value';

export const Enum: IModelType<Partial<IEnumConfig>, IEnum> = types
    .compose(
        'Enum',
        create<string>('enum', types.string, ''),
        types.model({
            options: types.array(
                types.model({ label: types.string, value: types.string })
            )
        })
    )
    .actions(it => ({
        afterCreate() {}
    }));
