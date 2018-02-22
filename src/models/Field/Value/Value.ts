import { IModelType, types, flow } from 'mobx-state-tree';
import { getParent, hasParent, ISimpleType } from 'mobx-state-tree';
import { getSnapshot, applySnapshot } from 'mobx-state-tree';
export type __IModelType = IModelType<any, any>;

import { IValueConfig, IValue } from '@root/types';

export function create<T>(type: string, kind: ISimpleType<T>, defaultv: T) {
    const TypeField: IModelType<Partial<IValueConfig<T>>, IValue<T>> = types
        .model('TypeField', {
            title: types.string,
            type: types.literal(type),
            value: types.optional(kind, defaultv),
            default: types.optional(kind, defaultv),
            initial: types.optional(kind, defaultv),
            enum: types.maybe(types.array(kind)),
            options: types.maybe(
                types.array(types.model({ label: types.string, value: kind }))
            ),
            const: types.maybe(kind),
            name: types.optional(types.string, ''),
            required: types.optional(types.boolean, false),
            disabled: types.optional(types.boolean, false),
            visible: types.optional(types.boolean, true)
        })
        .volatile(it => ({
            errors: [] as Array<string>,
            validating: false,
            syncing: false
        }))
        .actions(it => ({
            afterCreate() {
                if (it.name === '') {
                    const { title } = it;
                    it.name = title.toLowerCase().replace(' ', '-');
                }
                it.initial = it.value;
                if (
                    it.enum != null &&
                    it.enum.length > 0 &&
                    (it.options == null || it.options.length === 0)
                ) {
                    const options = it.enum.map(option => ({
                        label: String(option),
                        value: option
                    }));
                    (it.options as any) = options;
                }
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
            clearErrors(): void {
                it.errors.length = 0;
            }
        }))
        .actions(it => ({
            async asyncValidateBase(): Promise<Array<string>> {
                return [];
            },
            syncValidateBase(): Array<string> {
                const errors: Array<string> = [];
                if (it.const !== null && it.value !== it.const) {
                    errors.push(`should be equal to ${it.const}`);
                }
                if (
                    it.enum != null &&
                    it.enum.length > 0 &&
                    it.enum.findIndex(en => en === it.value) === -1
                ) {
                    errors.push(
                        `should be equal to one of the allowed values [${it.enum.slice(
                            0
                        )}]`
                    );
                }
                return errors;
            }
        }))
        .actions(it => ({
            async asyncValidate(): Promise<Array<string>> {
                return await it.asyncValidateBase();
            },
            syncValidate(): Array<string> {
                return it.syncValidateBase();
            }
        }))
        .actions(it => ({
            reset(): void {
                it.value = it.initial;
                it.clearErrors();
            },
            validate: flow<void>(function*() {
                if (it.syncing || it.validating) {
                    return [];
                }
                it.clearErrors();
                it.validating = true;
                const errors: Array<string> = [];
                errors.push(...it.syncValidate());
                errors.push(...(yield it.asyncValidate()));
                it.addErrors(errors);
                it.validating = false;
            })
        }))
        .actions(it => ({
            setValue(value: T): void {
                if (!it.syncing) {
                    it.syncing = true;
                    it.value = value;
                    it.syncing = false;
                    it.validate();
                }
            }
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
