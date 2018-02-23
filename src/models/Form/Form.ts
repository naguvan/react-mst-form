import { IModelType, types, flow } from 'mobx-state-tree';
import { getParent, hasParent, ISimpleType } from 'mobx-state-tree';
import { getSnapshot, applySnapshot } from 'mobx-state-tree';
export type __IModelType = IModelType<any, any>;

import { ITypeConfig, IType } from '@root/types';
import { IFormConfig, IForm } from '@root/types';

import createType from '../Type';
import createObject from '../Type/Object';

import { flatArray } from '../../utils';

export const Form: IModelType<Partial<IFormConfig>, IForm> = types
    .model('Form', {
        title: types.string,
        schema: types.late('Schema', createObject),
        errors: types.optional(types.array(types.string), []),
        layout: types.optional(types.frozen, []),
        sections: types.optional(
            types.array(
                types.model({
                    title: types.string,
                    layout: types.frozen
                })
            ),
            []
        )
    })
    .volatile(it => ({ _validating: false }))
    .actions(it => ({
        afterCreate() {
            const { schema, layout, sections } = it;
            const layouts = sections.map(section => section.layout);
            const items = flatArray<string>([...layout, ...layouts]);
            const invalids = items.filter(
                item => !schema.properties!.has(item)
            );

            if (invalids.length) {
                throw new TypeError(
                    `[${invalids
                        .map(invalid => `'${invalid}'`)
                        .join(', ')}] layout field${
                        invalids.length === 1 ? ' is' : 's are'
                    } not configured.`
                );
            }

            for (const [key, field] of it.schema.properties!.entries()) {
                field.setName(key);
            }

            // if (!hasParent(it)) {
            //     unprotect(it);
            // }
        }
    }))
    .views(it => ({
        get fields(): Array<IType> {
            return Array.from(it.schema.properties!.values());
        },
        get values(): { [key: string]: any } {
            return Array.from(it.schema.properties!.entries()).reduce(
                (values, [key, field]) => {
                    values[key] = field.value;
                    return values;
                },
                {} as {
                    [key: string]: any;
                }
            );
        },
        get(key: string): IType | undefined {
            return it.schema.properties!.get(key);
        },
        get fieldErrors(): { [key: string]: Array<string> } {
            return Array.from(it.schema.properties!.entries()).reduce(
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
