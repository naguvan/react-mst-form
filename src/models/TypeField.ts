import { IModelType, types, unprotect } from 'mobx-state-tree';
import { getParent, hasParent } from 'mobx-state-tree';
import { getSnapshot, applySnapshot } from 'mobx-state-tree';
export type __IModelType = IModelType<any, any>;

import { ITypeFieldConfig, ITypeField } from '../types/Field';

export const TypeField: IModelType<
    Partial<ITypeFieldConfig<any, any>>,
    ITypeField<any, any>
> = types
    .model('Field', {
        type: types.enumeration('type', ['string', 'number', 'boolean']),
        title: types.string,
        name: types.optional(types.string, ''),
        required: types.optional(types.boolean, false),
        disabled: types.optional(types.boolean, false),
        visible: types.optional(types.boolean, true),
        error: types.optional(types.string, '')
    })
    .actions(it => ({
        afterCreate() {
            if (it.name === '') {
                const { title } = it;
                it.name = title.toLowerCase().replace(' ', '-');
            }
            // if (!hasParent(it)) {
            //     unprotect(it);
            // }
        },
        setName(name: string): void {
            it.name = name;
        },
        setTitle(title: string): void {
            it.title = title;
        },
        setRequired(required: boolean): void {
            it.required = required;
        },
        setDisabled(disabled: boolean): void {
            it.disabled = disabled;
        },
        setVisible(visible: boolean): void {
            it.visible = visible;
        },
        setError(error: string): void {
            it.error = error;
        }
    })) as any;
