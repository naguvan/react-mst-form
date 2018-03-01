import { IModelType, types, unprotect, ISimpleType } from 'mobx-state-tree';
import { getParent, hasParent } from 'mobx-state-tree';
import { getSnapshot, applySnapshot } from 'mobx-state-tree';
export type __IModelType = IModelType<any, any>;

import { IMap, toJS } from 'mobx';

import { IObjectConfig, IObject, IType } from '@root/types';
import createValue from '../Value';
import { keys, unique } from '../../../utils';
import createType from '../Type';

let NObject: IModelType<Partial<IObjectConfig>, IObject>;

export default function create(): IModelType<Partial<IObjectConfig>, IObject> {
    if (!NObject) {
        const Object = types
            .compose(
                'Object',
                createValue<object | null, 'object'>(
                    'object',
                    types.map(types.frozen),
                    {}
                ),
                types.model({
                    properties: types.maybe(types.map(types.late(createType))),
                    minProperties: types.maybe(types.number),
                    maxProperties: types.maybe(types.number),
                    additionalProperties: types.maybe(
                        types.union(types.boolean, types.late(createType))
                    ),
                    required: types.maybe(types.array(types.string)),
                    layout: types.optional(types.frozen, [])
                })
            )
            .volatile(it => ({
                getActuals(value: IMap<string, object> | null): Array<string> {
                    if (value === null) {
                        return [];
                    }
                    const props: Array<string> = [];
                    value.forEach((v, key) => props.push(key));
                    return props;
                }
            }))
            .volatile(it => ({
                getAdditionals(
                    value: IMap<string, object> | null
                ): Array<string> {
                    return it
                        .getActuals(value)
                        .filter(prop => !it.properties!.has(prop));
                },

                getProperties(): Array<string> {
                    if (it.properties) {
                        return it.properties.keys().slice(0);
                    }
                    return [];
                },

                getProperty(property: string): IType | undefined {
                    return it.properties !== null
                        ? it.properties!.get(property)
                        : undefined;
                }
            }))
            .views(it => ({
                get count() {
                    return it.properties != null ? it.properties.size : 0;
                },
                get valid(): boolean {
                    return (
                        it.errors!.length === 0 &&
                        it
                            .getProperties()
                            .every(property => it.getProperty(property)!.valid)
                    );
                }
            }))
            .actions(it => ({
                afterCreate() {
                    if (it.minProperties !== null && it.minProperties < 0) {
                        throw new TypeError(
                            `minProperties can not be negative`
                        );
                    }
                    if (it.maxProperties !== null && it.maxProperties < 0) {
                        throw new TypeError(
                            `maxProperties can not be negative`
                        );
                    }
                    if (
                        it.required !== null &&
                        it.required.length !== unique(it.required).length
                    ) {
                        throw new TypeError(
                            `required should not have duplicate properties`
                        );
                    }
                }
            }))
            .actions(it => ({
                async asyncValidate(
                    value: IMap<string, object> | null
                ): Promise<Array<string>> {
                    const errors = await it.asyncValidateBase(value);
                    if (
                        value !== null &&
                        it.additionalProperties !== null &&
                        typeof toJS(it.additionalProperties) !== 'boolean'
                    ) {
                        const additionals = it.getAdditionals(value);
                        if (additionals.length > 0) {
                            const extratype = it.additionalProperties as IType;
                            for (const additional of additionals) {
                                for (const error of await extratype.tryValidate(
                                    value.get(additional)
                                )) {
                                    errors.push(
                                        `additional property '${additional}' ${error.replace(
                                            'Value ',
                                            ''
                                        )}`
                                    );
                                }
                            }
                        }
                    }

                    for (const property of it.getProperties()) {
                        await it.getProperty(property)!.validate();
                    }
                    return errors;
                },
                syncValidate(
                    value: IMap<string, object> | null
                ): Array<string> {
                    const errors: Array<string> = it.syncValidateBase(value);
                    if (value === null) {
                        return errors;
                    }
                    if (
                        it.minProperties !== null &&
                        value.size < it.minProperties
                    ) {
                        errors.push(
                            `should NOT have less than ${
                                it.minProperties
                            } properties`
                        );
                    }
                    if (
                        it.maxProperties !== null &&
                        value.size > it.maxProperties
                    ) {
                        errors.push(
                            `should NOT have more than ${
                                it.maxProperties
                            } properties`
                        );
                    }
                    if (it.required !== null) {
                        const actuals = it.getActuals(value);
                        const requireds = it.required.filter(
                            required => !actuals.includes(required)
                        );
                        if (requireds.length > 0) {
                            errors.push(
                                `should have required properties [${requireds.join(
                                    ', '
                                )}]`
                            );
                        }
                    }
                    if (
                        it.additionalProperties !== null &&
                        typeof toJS(it.additionalProperties) === 'boolean'
                    ) {
                        const additionals = it.getAdditionals(value);
                        if (additionals.length > 0) {
                            if (!it.additionalProperties) {
                                errors.push(
                                    `should NOT have additional properties [${additionals.join(
                                        ', '
                                    )}]`
                                );
                            }
                        }
                    }
                    return errors;
                },
                setValue(value: object | null): void {
                    (it as any).value = value;
                    if (value) {
                        keys(value).forEach(key => {
                            const type = it.properties!.get(key);
                            if (type) {
                                return (type as any).setValue(
                                    (value as any)[key]
                                );
                            }
                        });
                    }
                }
            }))
            .views(it => ({
                get data(): object | null {
                    const properties = it.getProperties();
                    return properties.reduce(
                        (data: any, key: string) => {
                            const type = it.properties!.get(key);
                            data[key] = type!.data;
                            return data;
                        },
                        {
                            ...toJS(it.value || {})
                        }
                    );
                }
            }));

        NObject = Object as any;
    }
    return NObject as IModelType<Partial<IObjectConfig>, IObject>;
}
