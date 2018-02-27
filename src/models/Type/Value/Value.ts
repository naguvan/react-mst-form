import { IModelType, types, flow } from 'mobx-state-tree';
import { getParent, hasParent, ISimpleType } from 'mobx-state-tree';
import { getSnapshot, applySnapshot } from 'mobx-state-tree';
export type __IModelType = IModelType<any, any>;

import { IValueConfig, IValue } from '@root/types';
import { toJS } from 'mobx';

export function create<T>(type: string, kind: ISimpleType<T>, defaultv: T) {
    const Value: IModelType<Partial<IValueConfig<T>>, IValue<T>> = types
        .model('Value', {
            title: types.maybe(types.string),
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
            visible: types.optional(types.boolean, true),
            errors: types.optional(types.array(types.string), []),
            component: types.maybe(types.string),
            sequence: types.maybe(types.number)
        })
        .volatile(it => ({ validating: false, syncing: false }))
        .actions(it => ({
            afterCreate() {
                if (it.name === '' && it.title) {
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
            },
            tryValue(value: Object): boolean {
                return kind.is(value);
            },
            setValue(value: T): void {
                it.value = value;
            }
        }))
        .actions(it => ({
            async asyncValidateBase(value: T): Promise<Array<string>> {
                return [];
            },
            syncValidateBase(value: T): Array<string> {
                const errors: Array<string> = [];
                if (it.const !== null && value !== it.const) {
                    errors.push(`should be equal to ${it.const}`);
                }
                if (
                    it.enum != null &&
                    it.enum.length > 0 &&
                    it.enum.findIndex(en => en === value) === -1
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
        .volatile(it => ({
            async asyncValidate(value: T): Promise<Array<string>> {
                return await it.asyncValidateBase(value);
            },
            syncValidate(value: T): Array<string> {
                return it.syncValidateBase(value);
            }
        }))
        .volatile(it => ({
            async tryValidate(
                value: Object | undefined | null
            ): Promise<Array<string>> {
                const validities = kind.validate(value, []);
                if (validities.length > 0) {
                    return validities.map(validity => validity.message!);
                }
                const errors: Array<string> = [];
                errors.push(...it.syncValidate(value as T));
                errors.push(...(await it.asyncValidate(value as T)));
                return errors;
            }
        }))
        .views(it => ({
            get modified(): boolean {
                return it.value !== it.initial;
            },
            get valid(): boolean {
                return it.errors.length === 0;
            },
            get data(): T {
                return toJS(it.value);
            }
        }))
        .actions(it => ({
            reset(): void {
                it.value = it.initial;
                it.clearErrors();
            },
            validate: flow<void>(function*() {
                if (it.syncing /*|| it.validating*/) {
                    return [];
                }
                it.clearErrors();
                it.validating = true;
                it.addErrors(yield it.tryValidate(it.value));
                it.validating = false;
            })
        }))
        .actions(it => ({
            async sync(value: T): Promise<void> {
                if (!it.syncing) {
                    it.syncing = true;
                    it.setValue(value);
                    it.syncing = false;
                    await it.validate();
                }
            }
        }));

    return Value;
}
