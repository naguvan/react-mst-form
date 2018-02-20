import { IModelType, types, flow } from 'mobx-state-tree';
import { getParent, hasParent, ISimpleType } from 'mobx-state-tree';
import { getSnapshot, applySnapshot } from 'mobx-state-tree';
export type __IModelType = IModelType<any, any>;

import { IFieldConfig, IField } from '@root/types';
import { IFormConfig, IForm } from '@root/types';

import { Field } from '../field/Field';

import { flatArray } from '../../utils';

export const Form: IModelType<Partial<IFormConfig>, IForm> = types
    .model('Form', {
        title: types.string,
        properties: types.map(Field),
        errors: types.optional(types.array(types.string), []),
        layout: types.frozen
    })
    .volatile(it => ({ _validating: false }))
    .actions(it => ({
        afterCreate() {
            const { properties, layout } = it;
            const items = flatArray<string>(layout);
            const invalids = items.filter(item => !properties.has(item));

            if (invalids.length) {
                throw new TypeError(
                    `[${invalids
                        .map(invalid => `'${invalid}'`)
                        .join(', ')}] layout field${
                        invalids.length === 1 ? ' is' : 's are'
                    } not configured.`
                );
            }

            it.properties
                .entries()
                .forEach(([key, field]) => field.setName(key));

            // if (!hasParent(it)) {
            //     unprotect(it);
            // }
        }
    }))
    .views(it => ({
        get fields(): Array<IField> {
            return it.properties.values();
        },
        get values(): { [key: string]: string | number | boolean } {
            return it.properties.entries().reduce(
                (values, [key, field]) => {
                    values[key] = field.value;
                    return values;
                },
                {} as {
                    [key: string]: string | number | boolean;
                }
            );
        },
        get(key: string): IField | undefined {
            return it.properties.get(key);
        },
        get fieldErrors(): { [key: string]: Array<string> } {
            return it.properties.entries().reduce(
                (values, [key, field]) => {
                    values[key] = field.errors.slice(0);
                    return values;
                },
                {} as { [key: string]: Array<string> }
            );
        }
    }))
    .views(it => ({
        get valid(): boolean {
            return it.fields.every(field => field.valid);
        },
        get modified(): boolean {
            return it.fields.some(field => field.modified);
        },
        get validating(): boolean {
            return it._validating || it.fields.some(field => field.validating);
        }
    }))
    .actions(it => ({
        reset(): void {
            it.errors.length = 0;
            it.fields.forEach(field => field.reset());
        },
        validate: flow<void>(function*() {
            if (it.validating) {
                return [];
            }
            it._validating = true;
            for (const field of it.fields) {
                yield field.validate();
            }
            it._validating = false;
        })
    }));
