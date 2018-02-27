import { IModelType, types, unprotect, ISimpleType } from 'mobx-state-tree';
import { getParent, hasParent } from 'mobx-state-tree';
import { getSnapshot, applySnapshot } from 'mobx-state-tree';
export type __IModelType = IModelType<any, any>;

import { IMap, toJS } from 'mobx';

import { IArrayConfig, IArray, IType, ITypeConfig } from '@root/types';
import createValue from '../Value';
import { keys, isArrayLike, unique } from '../../../utils';
import createType from '../Type';

let NArray: IModelType<Partial<IArrayConfig>, IArray>;

export default function create(): IModelType<Partial<IArrayConfig>, IArray> {
    if (!NArray) {
        const Array: IModelType<Partial<IArrayConfig>, IArray> = types
            .compose(
                'Array',
                createValue<Array<Object | null>, 'array'>(
                    'array',
                    types.array(types.frozen),
                    []
                ),
                types.model({
                    minItems: types.maybe(types.number),
                    maxItems: types.maybe(types.number),
                    items: types.maybe(
                        types.union(
                            types.late(createType),
                            types.array(types.late(createType))
                        )
                    ),
                    uniqueItems: types.maybe(types.boolean),
                    additionalItems: types.maybe(types.boolean)
                })
            )
            // .views(it => ({
            //     get count() {
            //         return it.properties != null ? it.properties.size : 0;
            //     },
            //     get valid(): boolean {
            //         return (
            //             it.errors.length === 0 &&
            //             it
            //                 .getProperties()
            //                 .every(property => it.getProperty(property)!.valid)
            //         );
            //     }
            // }))
            .actions(it => ({
                afterCreate() {
                    if (it.minItems !== null && it.minItems < 0) {
                        throw new TypeError(`minItems can not be negative`);
                    }
                    if (it.maxItems !== null && it.maxItems < 0) {
                        throw new TypeError(`maxItems can not be negative`);
                    }
                }
            }))
            .actions(it => ({
                async asyncValidate(
                    value: Array<Object | null>
                ): Promise<Array<string>> {
                    const errors = await it.asyncValidateBase(value);
                    if (it.items !== null) {
                        if (isArrayLike(it.items)) {
                            for (const item of it.items) {
                                await item.validate();
                            }
                        } else if (value !== null) {
                            for (const [index, item] of value.entries()) {
                                for (const error of await it.items.tryValidate(
                                    item
                                )) {
                                    errors.push(
                                        `data[${index}] ${error.replace(
                                            'Value ',
                                            ''
                                        )}`
                                    );
                                }
                            }
                        }
                    }
                    return errors;
                },
                syncValidate(value: Array<Object | null>): Array<string> {
                    const errors: Array<string> = it.syncValidateBase(value);
                    if (value === null) {
                        return errors;
                    }
                    if (it.minItems !== null && value.length < it.minItems) {
                        errors.push(
                            `should NOT have less than ${it.minItems} items`
                        );
                    }
                    if (it.maxItems !== null && value.length > it.maxItems) {
                        errors.push(
                            `should NOT have more than ${it.maxItems} items`
                        );
                    }
                    if (
                        it.uniqueItems !== null &&
                        it.uniqueItems &&
                        value.length !== unique(value).length
                    ) {
                        errors.push(`should NOT have duplicate items`);
                    }
                    if (
                        isArrayLike(it.items) &&
                        it.additionalItems !== null &&
                        it.additionalItems === false
                    ) {
                        if (value.length > it.items.length) {
                            errors.push(`should NOT have additional items`);
                        }
                    }
                    return errors;
                },
                setValue(value: Array<Object | null>): void {
                    (it as any).value = value;
                    if (value && isArrayLike(it.items)) {
                        for (const [index, item] of it.items.entries()) {
                            (item as any).setValue(value[index]);
                        }
                    }
                }
            }))
            .actions(it => ({
                add(): void {
                    it.setValue([...it.value, (it.items as IType).default!]);
                }
            }))
            .views(it => ({
                get data(): Array<Object | null> {
                    const items = isArrayLike(it.items) ? [...it.items] : [];
                    return items.reduce(
                        (data: Array<Object | null>, item, index) => {
                            data[index] = item!.data;
                            return data;
                        },
                        [...toJS(it.value || [])]
                    );
                },
                get valid(): boolean {
                    return (
                        it.errors.length === 0 &&
                        (isArrayLike(it.items)
                            ? it.items.every(item => item!.valid)
                            : true)
                    );
                },

                get types(): Array<ITypeConfig> {
                    if (it.items === null || isArrayLike(it.items)) {
                        return [];
                    }
                    const config = getSnapshot(it.items);
                    return it.value.map(
                        value =>
                            ({
                                ...config,
                                value: toJS(value)
                            } as ITypeConfig)
                    );
                }
            }));

        NArray = Array;
    }
    return NArray;
}
