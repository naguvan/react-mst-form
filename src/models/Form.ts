import { IModelType, types, unprotect } from 'mobx-state-tree';
import { getParent, hasParent, ISimpleType } from 'mobx-state-tree';
import { getSnapshot, applySnapshot } from 'mobx-state-tree';
export type __IModelType = IModelType<any, any>;

import { IFieldConfig, IField } from '../types/Field';
import { IFormConfig, IForm } from '../types/Form';

import { Field } from './Field';

import { flatArray } from '../utils';

export const Form: IModelType<Partial<IFormConfig>, IForm> = types
    .model('Form', {
        properties: types.map(Field),
        layout: types.frozen // ,
        // fields: types.optional(types.array(Field), [])
        // ,
        // values: types.optional(
        //     types.map(types.union(types.string, types.number)),
        //     {}
        // )
    })
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

        get values() {
            return it.properties.entries().reduce(
                (values: any, [key, field]) => {
                    values[key] = field.value;
                    return values;
                },
                {} as any
            );
        },

        get(key: string): IField | undefined {
            return it.properties.get(key);
        }
    })) as any;
