import { IModelType, types, unprotect } from 'mobx-state-tree';
import { getParent, hasParent, ISimpleType } from 'mobx-state-tree';
import { getSnapshot, applySnapshot } from 'mobx-state-tree';
export type __IModelType = IModelType<any, any>;

import { IFieldConfig, IField } from '../types/Field';
import { IFormConfig, IForm } from '../types/Form';

import { StringField } from './StringField';
import { NumberField } from './NumberField';
import { TypeField } from './TypeField';
import { create } from './Field';

export const Form: IModelType<Partial<IFormConfig>, IForm> = types
    .model<any>('Form', {
        properties: types.map(types.union(TypeField)),
        layout: types.frozen,
        fields: types.optional(
            types.array(types.union(StringField, NumberField)),
            []
        )
        // ,
        // values: types.optional(
        //     types.map(types.union(types.string, types.number)),
        //     {}
        // )
    })
    .actions(it => ({
        afterCreate() {
            const { properties } = it;

            Object.keys(it.properties).map(property => {
                const config = properties[property];
                console.info(property, JSON.stringify(config));
                // return create(config);
            });

            // it.fields = Object.keys(properties).map(property => {
            //     const config = properties[property];
            //     console.info(property, JSON.stringify(config));
            //     return create(config);
            // });
            // if (!hasParent(it)) {
            //     unprotect(it);
            // }
        }
    }))
    .views(it => ({
        get values() {
            const { fields }: { fields: Array<IField> } = it;
            return fields.reduce(
                (values: any, field: IField) => {
                    values[field.title] = field.value;
                    return values;
                },
                {} as any
            );
        }
    }));
