import { IModelType, types, unprotect, ISimpleType } from 'mobx-state-tree';
import { getParent, hasParent } from 'mobx-state-tree';
import { getSnapshot, applySnapshot } from 'mobx-state-tree';
export type __IModelType = IModelType<any, any>;

import { IStringConfig, IString } from '@root/types';
import create from '../Value';
import { regex, MAX_SAFE_INTEGER, MIN_SAFE_INTEGER } from '../../../utils';

export const String: IModelType<Partial<IStringConfig>, IString> = types
    .compose(
        'String',
        create<string>('string', types.string, ''),
        types.model({
            pattern: types.optional(types.string, ''),
            minLength: types.optional(types.number, MIN_SAFE_INTEGER),
            maxLength: types.optional(types.number, MAX_SAFE_INTEGER)
        })
    )
    .actions(it => ({
        afterCreate() {
            if (it.pattern && !regex(it.pattern)) {
                throw new TypeError(`pattern '${it.pattern}' is invalid.`);
            }
        }
    }))
    .actions(it => ({
        async validation(): Promise<Array<string>> {
            const errors: Array<string> = [];
            if (it.value.length < it.minLength) {
                errors.push(
                    `should NOT be shorter than ${it.minLength} characters`
                );
            }
            if (it.value.length > it.maxLength) {
                errors.push(
                    `should NOT be longer than ${it.maxLength} characters`
                );
            }
            if (it.pattern && !it.value.match(regex(it.pattern)!)) {
                errors.push(`should match pattern ${it.pattern}`);
            }
            return errors;
        }
    }));
