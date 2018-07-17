import { types, IComplexType as IMobxType } from 'mobx-state-tree';

import { IType, ITypeConfig } from '../../types';

let Type: IMobxType<Partial<ITypeConfig>, IType>;

import './String';
import './Number';
import './Boolean';
import './Null';
import './Object';
import './Array';

import mappings from './Mappings';

export default function createType(): IMobxType<Partial<ITypeConfig>, IType> {
    if (!Type) {
        Type = types.union(
            snapshot =>
                snapshot && typeof snapshot === 'object' && 'type' in snapshot
                    ? mappings[snapshot.type]
                    : mappings['null'],
            mappings['string'],
            mappings['number'],
            mappings['boolean'],
            mappings['null'],
            mappings['object'],
            mappings['array']
        );
    }
    return Type;
}
