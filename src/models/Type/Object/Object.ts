import { IModelType, types, unprotect, ISimpleType } from 'mobx-state-tree';
import { getParent, hasParent } from 'mobx-state-tree';
import { getSnapshot, applySnapshot } from 'mobx-state-tree';
export type __IModelType = IModelType<any, any>;

import { IObjectConfig, IObject } from '@root/types';
import createValue from '../Value';
import { decimals } from '../../../utils';
import createType from '../Type';

export default function create(): IModelType<Partial<IObjectConfig>, IObject> {
    const Object: IModelType<Partial<IObjectConfig>, IObject> = types
        .compose(
            'Object',
            createValue<object | null>('object', types.null, null),
            types.model({
                properties: types.maybe(types.map(types.late(createType))),
                minProperties: types.maybe(types.number),
                maxProperties: types.maybe(types.number),
                additionalProperties: types.maybe(
                    types.union(types.boolean, types.late(createType))
                ),
                requiredx: types.maybe(types.array(types.string))
            })
        )
        .actions(it => ({
            afterCreate() {
                if (it.minProperties !== null && it.minProperties <= 0) {
                    throw new TypeError(
                        `minProperties can not be ${
                            it.minProperties === 0 ? 'zero' : 'negative'
                        }`
                    );
                }
                if (it.maxProperties !== null && it.maxProperties <= 0) {
                    throw new TypeError(
                        `maxProperties can not be ${
                            it.maxProperties === 0 ? 'zero' : 'negative'
                        }`
                    );
                }
            }
        }))
        .actions(it => ({
            syncValidate(): Array<string> {
                const errors: Array<string> = it.syncValidateBase();
                //    if (it.minimum !== null && it.value < it.minimum) {
                //        errors.push(`should NOT be lesser than ${it.minimum}`);
                //    }
                //    if (it.maximum !== null && it.value > it.maximum) {
                //        errors.push(`should NOT be greater than ${it.maximum}`);
                //    }
                //    if (it.multipleOf !== null && it.multipleOf > 1) {
                //        const multiplier = Math.pow(
                //            10,
                //            Math.max(decimals(it.value), decimals(it.multipleOf))
                //        );
                //        if (
                //            Math.round(it.value * multiplier) %
                //                Math.round(it.multipleOf * multiplier) !==
                //            0
                //        ) {
                //            errors.push(`should be multiple of ${it.multipleOf}`);
                //        }
                //    }
                return errors;
            }
        }));

    return Object;
}
