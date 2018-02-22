import { IModelType, types, unprotect } from 'mobx-state-tree';
import { getParent, hasParent } from 'mobx-state-tree';
import { getSnapshot, applySnapshot } from 'mobx-state-tree';
export type __IModelType = IModelType<any, any>;

import { INumberConfig, INumber } from '@root/types';
import create from '../Value';
import { decimals, MAX_SAFE_INTEGER, MIN_SAFE_INTEGER } from '../../../utils';

export const Number: IModelType<Partial<INumberConfig>, INumber> = types
    .compose(
        'Number',
        create<number>('number', types.number, 0),
        types.model({
            minimum: types.optional(types.number, MIN_SAFE_INTEGER),
            maximum: types.optional(types.number, MAX_SAFE_INTEGER),
            multipleOf: types.optional(types.number, 1)
        })
    )
    .actions(it => ({
        afterCreate() {
            if (it.multipleOf <= 0) {
                throw new TypeError(
                    `multipleOf can not be ${
                        it.multipleOf === 0 ? 'zero' : 'negative'
                    }`
                );
            }
        }
    }))
    .actions(it => ({
        syncValidate(): Array<string> {
            const errors: Array<string> = it.syncValidateBase();
            if (it.value < it.minimum) {
                errors.push(`should NOT be lesser than ${it.minimum}`);
            }
            if (it.value > it.maximum) {
                errors.push(`should NOT be greater than ${it.maximum}`);
            }
            if (it.multipleOf > 1) {
                const multiplier = Math.pow(
                    10,
                    Math.max(decimals(it.value), decimals(it.multipleOf))
                );
                if (
                    Math.round(it.value * multiplier) %
                        Math.round(it.multipleOf * multiplier) !==
                    0
                ) {
                    errors.push(`should be multiple of ${it.multipleOf}`);
                }
            }
            return errors;
        }
    }));
