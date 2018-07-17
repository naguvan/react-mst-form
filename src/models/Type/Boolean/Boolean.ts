import { IModelType, types } from 'mobx-state-tree';
export type __IModelType = IModelType<any, any>;

import { IBooleanConfig, IBoolean } from '../../../types';
import createValue from '../Value';
import mappings from '../Mappings';

export const Boolean: IModelType<
    Partial<IBooleanConfig>,
    IBoolean
    > = types
        .compose(
            'Boolean',
            createValue<boolean, 'boolean'>('boolean', types.boolean, false),
            types.model({})
        )
        .actions(it => ({
            afterCreate() { }
        }));

mappings['boolean'] = Boolean;