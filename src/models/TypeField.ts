import { IModelType, types, unprotect } from 'mobx-state-tree';
import { getParent, hasParent, ISimpleType } from 'mobx-state-tree';
import { getSnapshot, applySnapshot } from 'mobx-state-tree';
export type __IModelType = IModelType<any, any>;

import { ITypeFieldConfig, ITypeField } from '../types/Field';

export function create<T>(type: string, kind: ISimpleType<T>, defaultv: T) {
    const TypeField: IModelType<
        Partial<ITypeFieldConfig<T>>,
        ITypeField<T>
    > = types
        .model('TypeField', {
            // type: types.enumeration('type', ['string', 'number', 'boolean']),
            title: types.string,
            name: types.optional(types.string, ''),
            required: types.optional(types.boolean, false),
            disabled: types.optional(types.boolean, false),
            visible: types.optional(types.boolean, true),
            error: types.optional(types.string, ''),
            type: types.literal(type),
            value: types.optional(kind, defaultv),
            default: types.optional(kind, defaultv),
            initial: types.optional(kind, defaultv)
        })
        .actions(it => ({
            afterCreate() {
                if (it.name === '') {
                    const { title } = it;
                    it.name = title.toLowerCase().replace(' ', '-');
                }
                it.initial = it.value;
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
            },
            setValue(value: T): void {
                it.value = value;
            },
            reset(): void {
                it.value = it.initial;
            }
        }));

    return TypeField;
}
