import { IModelType, types, flow } from 'mobx-state-tree';
import { getParent, hasParent, ISimpleType } from 'mobx-state-tree';
import { getSnapshot, applySnapshot } from 'mobx-state-tree';
export type __IModelType = IModelType<any, any>;

import { IValueFieldConfig, IValueField } from '@root/types';

export function create<T>(type: string, kind: ISimpleType<T>, defaultv: T) {
    const TypeField: IModelType<
        Partial<IValueFieldConfig<T>>,
        IValueField<T>
    > = types
        .model('TypeField', {
            title: types.string,
            type: types.literal(type),
            value: types.optional(kind, defaultv),
            default: types.optional(kind, defaultv),
            initial: types.optional(kind, defaultv),
            name: types.optional(types.string, ''),
            required: types.optional(types.boolean, false),
            disabled: types.optional(types.boolean, false),
            visible: types.optional(types.boolean, true),
            errors: types.optional(types.array(types.string), []),
            syncing: types.optional(types.boolean, false),
            validating: types.optional(types.boolean, false)
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
            addError(error: string): void {
                it.errors.push(error);
            },
            addErrors(errors: Array<string>): void {
                it.errors.push(...errors);
            },
            clearError(): void {
                it.errors.length = 0;
            },
            setValue(value: T): void {
                if (!it.syncing) {
                    it.syncing = true;
                    it.value = value;
                    it.syncing = false;
                }
            }
        }))
        .actions(it => ({
            reset(): void {
                it.value = it.initial;
                it.clearError();
            },
            validate: flow<void>(function*() {
                if (it.syncing || it.validating) {
                    return [];
                }
                it.validating = true;
                const errors = yield Promise.resolve([]);
                it.validating = false;
                it.addErrors(errors);
            })
        }))
        .views(it => ({
            get modified(): boolean {
                return it.value !== it.initial;
            },
            get valid(): boolean {
                return it.errors.length === 0;
            }
        }));

    return TypeField;
}
