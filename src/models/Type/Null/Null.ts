import { IModelType, types } from 'mobx-state-tree';
export type __IModelType = IModelType<any, any>;

import { INullConfig, INull } from '@root/types';
import createValue from '../Value';
import mappings from '../Mappings';

export const Null: IModelType<Partial<INullConfig>, INull> = types.compose(
    'Null',
    createValue<null, 'null'>('null', types.null, null),
    types.model({})
);

mappings['null'] = Null;