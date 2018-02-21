import { IModelType, types, unprotect, ISimpleType } from 'mobx-state-tree';
import { getParent, hasParent } from 'mobx-state-tree';
import { getSnapshot, applySnapshot } from 'mobx-state-tree';
export type __IModelType = IModelType<any, any>;

import { IStringConfig, IString } from '@root/types';
import create from '../Value';
import { MAX_SAFE_INTEGER, MIN_SAFE_INTEGER } from '../../../utils';

export const String: IModelType<Partial<IStringConfig>, IString> = types
    .compose(
        'String',
        create<string>('string', types.string, ''),
        types.model({
            minLength: types.optional(types.number, MIN_SAFE_INTEGER)
        })
    )
    .actions(it => ({
        afterCreate() {}
    }))
    .actions(it => ({
        async validation(): Promise<Array<string>> {
            const errors: Array<string> = [];
            if (it.value.length < it.minLength) {
                errors.push(
                    `should NOT be shorter than ${it.minLength} characters`
                );
            }
            return errors;
        }
    }));
