import { IModelType, types, unprotect, ISimpleType } from 'mobx-state-tree';
import { getParent, hasParent, destroy, detach, clone } from 'mobx-state-tree';
import { getSnapshot, applySnapshot } from 'mobx-state-tree';
export type __IModelType = IModelType<any, any>;

import { IMap, toJS, observe } from 'mobx';

import { IArrayConfig, IArray, IType, ITypeConfig } from '@root/types';
import createValue from '../Value';
import { keys, isArray, unique } from '../../../utils';
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
                    // items: types.maybe(
                    //     types.union(
                    //         types.late(createType),
                    //         types.array(types.late(createType))
                    //     )
                    // ),
                    items: types.optional(types.frozen, null),
                    uniqueItems: types.maybe(types.boolean),
                    additionalItems: types.maybe(types.boolean),
                    elements: types.optional(
                        types.array(types.late(createType)),
                        []
                    )
                })
            )
            .views(it => ({
                get dynamic() {
                    return !isArray(it.items);
                }
            }))
            .actions(it => ({
                updateIndexValue(index: number, value: Object | null): void {
                    // const values = [...it.value];
                    // values[index] = value;
                    // it.setValue(values);
                    it.value![index] = value;
                },

                removeIndexValue(index: number): void {
                    it.value!.splice(index, 1);
                }
            }))
            .actions(it => ({
                getConfig(
                    value: Object | null,
                    index: number,
                    element: any
                ): IType {
                    // const element = getSnapshot(it.items!);
                    const Type = createType();
                    // console.info(value);
                    const type = Type.create({
                        ...element,
                        value: toJS(value)
                    } as ITypeConfig);
                    // const type = clone(it.items as any);
                    // type.setValue(value);
                    observe(type, 'value', changes => {
                        it.updateIndexValue(index, type.value);
                        // setTimeout(
                        //     () =>
                        //         it.updateIndexValue(
                        //             index,
                        //             type.value
                        //         ),
                        //     4
                        // );
                    });
                    return type;
                }
            }))
            .actions(it => ({
                updateElements(values: Array<Object | null> | null) {
                    if (values != null && it.items !== null) {
                        it.elements.length = 0;
                        if (!isArray(it.items)) {
                            it.elements.push(
                                ...values.map((value, index) =>
                                    it.getConfig(value, index, it.items)
                                )
                            );
                        } else {
                            it.items.forEach((item, index) => {
                                it.elements.push(
                                    it.getConfig(
                                        values.length > index
                                            ? values[index]
                                            : null,
                                        index,
                                        item
                                    )
                                );
                            });
                        }
                    }
                },

                async push(): Promise<void> {
                    if (it.dynamic) {
                        const value = (it.items as IType).default!;
                        const index = it.value!.length;
                        it.updateIndexValue(index, value);
                        it.elements.push(it.getConfig(value, index, it.items));
                        await it.validate();
                    }
                },

                async remove(index: number): Promise<void> {
                    if (it.dynamic) {
                        it.removeIndexValue(index);
                        const element = it.elements![index];
                        detach(element as any);
                        // it.elements.splice(index, 1);
                        await it.validate();
                    }
                }
            }))
            .actions(it => ({
                afterCreate() {
                    if (it.minItems !== null && it.minItems < 0) {
                        throw new TypeError(`minItems can not be negative`);
                    }
                    if (it.maxItems !== null && it.maxItems < 0) {
                        throw new TypeError(`maxItems can not be negative`);
                    }
                    it.updateElements(toJS(it.value));
                }
            }))
            .actions(it => ({
                async asyncValidate(
                    value: Array<Object | null>
                ): Promise<Array<string>> {
                    const errors = await it.asyncValidateBase(value);
                    if (it.elements !== null) {
                        for (const element of it.elements) {
                            await element.validate();
                        }
                        // if (isArray(it.items)) {
                        //     for (const item of it.items) {
                        //         await item.validate();
                        //     }
                        // } else if (value !== null) {
                        //     for (const element of it.elements) {
                        //         await element.validate();
                        //     }
                        //     for (const [index, item] of value.entries()) {
                        //         for (const error of await it.items.tryValidate(
                        //             item
                        //         )) {
                        //             errors.push(
                        //                 `data[${index}] ${error.replace(
                        //                     'Value ',
                        //                     ''
                        //                 )}`
                        //             );
                        //         }
                        //     }
                        // }
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
                        isArray(it.items) &&
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
                    // if (value) {
                    //     for (const [index, element] of it.elements.entries()) {
                    //         (element as any).setValue(value[index]);
                    //     }
                    // }
                    it.updateElements(toJS(value));
                }
            }))
            .views(it => ({
                get data(): Array<Object | null> {
                    return it.elements.reduce(
                        (data: Array<Object | null>, element, index) => {
                            data[index] = element!.data;
                            return data;
                        },
                        [...toJS(it.value || [])]
                    );
                },
                get valid(): boolean {
                    return (
                        it.errors!.length === 0 &&
                        it.elements.every(element => element!.valid)
                    );
                }
            }));

        NArray = Array;
    }
    return NArray;
}
