import { IModelType, types, unprotect, ISimpleType } from 'mobx-state-tree';
import { getParent, hasParent } from 'mobx-state-tree';
import { getSnapshot, applySnapshot } from 'mobx-state-tree';
export type __IModelType = IModelType<any, any>;

import { IStringConfig, IString } from '@root/types';

import create from '../Value';
import { regex } from '../../../utils';

import { matchers } from './matchers';

export const String: IModelType<Partial<IStringConfig>, IString> = types
    .compose(
        'String',
        create<string>('string', types.string, ''),
        types.model({
            minLength: types.maybe(types.number),
            maxLength: types.maybe(types.number),
            pattern: types.maybe(types.string),
            format: types.maybe(
                types.union(
                    ...Object.keys(matchers).map(format =>
                        types.literal(format)
                    )
                )
            )
        })
    )
    .actions(it => ({
        afterCreate() {
            if (it.pattern != null && !regex(it.pattern)) {
                throw new TypeError(`pattern '${it.pattern}' is invalid.`);
            }
        }
    }))
    .actions(it => ({
        syncValidate(): Array<string> {
            const errors: Array<string> = it.syncValidateBase();
            if (it.minLength !== null && it.value.length < it.minLength) {
                errors.push(
                    `should NOT be shorter than ${it.minLength} characters`
                );
            }
            if (it.maxLength !== null && it.value.length > it.maxLength) {
                errors.push(
                    `should NOT be longer than ${it.maxLength} characters`
                );
            }
            if (it.pattern !== null && !it.value.match(regex(it.pattern)!)) {
                errors.push(`should match pattern ${it.pattern}`);
            }
            if (it.format != null && !matchers[it.format](it.value)) {
                errors.push(`should match format ${it.format}`);
            }
            return errors;
        }
    }));
