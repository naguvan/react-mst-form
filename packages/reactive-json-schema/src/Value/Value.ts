import { toJS } from "mobx";
import { flow, IModelType, types } from "mobx-state-tree";
import { ISimpleType } from "mobx-state-tree";

import { IAnything } from "../Common";

export interface IValueAttrs<V> {
  readonly title?: string | null;
  readonly value: V | null;
  readonly default?: V | null;
  readonly initial?: V | null;
  readonly name: string | null;
  readonly disabled: boolean | null;
  readonly visible: boolean | null;
  readonly mandatory: boolean | null;
  readonly enum?: V[] | null;
  readonly const?: V | null;
  readonly options?: Array<{ label: string; value: V }> | null;
  readonly component?: string | null;
  readonly sequence?: number | null;
  readonly errors?: string[] | null;
}

export interface IValueConfig<V, T> extends Partial<IValueAttrs<V>> {
  readonly type: T;
}

export interface IValue<V, T> extends IValueAttrs<V> {
  readonly type: T;
  readonly modified: boolean;
  readonly validating: boolean;
  readonly syncing: boolean;
  readonly valid: boolean;
  // readonly errors: string[];
  // readonly initial: V;
  readonly data: V;
  setValue(value: V): void;
  setName(name: string): void;
  setTitle(title: string): void;
  setMandatory(mandatory: boolean): void;
  setDisabled(disabled: boolean): void;
  setVisible(visible: boolean): void;
  addError(error: string): void;
  addErrors(errors: string[]): void;
  clearErrors(): void;
  reset(): void;
  validate(): Promise<void>;

  sync(value: V): Promise<void>;

  tryValue(value: IAnything): boolean;
  tryValidate(value: IAnything | undefined | null): Promise<string[]>;

  asyncValidate(value: V): Promise<string[]>;
  syncValidate(value: V): string[];
  asyncValidateBase(value: V): Promise<string[]>;
  syncValidateBase(value: V): string[];
}

export function createValue<V, T>(type: T, kind: ISimpleType<V>, defaultv: V) {
  const Value: IModelType<Partial<IValueConfig<V, T>>, IValue<V, T>> = types
    .model("Value", {
      component: types.maybe(types.string),
      const: types.maybe(kind),
      default: types.optional(kind, defaultv),
      disabled: types.optional(types.boolean, false),
      enum: types.maybe(types.array(kind)),
      errors: types.optional(types.array(types.string), []),
      initial: types.optional(kind, defaultv),
      mandatory: types.optional(types.boolean, false),
      name: types.optional(types.string, ""),
      options: types.maybe(
        types.array(types.model({ label: types.string, value: kind }))
      ),
      sequence: types.maybe(types.number),
      title: types.maybe(types.string),
      type: types.literal(type),
      value: types.optional(kind, defaultv),
      visible: types.optional(types.boolean, true)
    })
    .volatile(it => ({ _validating: false, syncing: false }))
    .actions(it => ({
      afterCreate() {
        if (it.name === "" && it.title) {
          const { title } = it;
          it.name = title.toLowerCase().replace(" ", "-");
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
      setMandatory(mandatory: boolean): void {
        it.mandatory = mandatory;
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
      addErrors(errors: string[]): void {
        it.errors.push(...errors);
      },
      clearErrors(): void {
        it.errors.length = 0;
      },
      tryValue(value: IAnything): boolean {
        return kind.is(value);
      },
      setValue(value: V): void {
        it.value = value;
      }
    }))
    .actions(it => ({
      async asyncValidateBase(value: V): Promise<string[]> {
        return [];
      },
      syncValidateBase(value: V): string[] {
        const errors: string[] = [];
        if (
          it.mandatory !== null &&
          it.mandatory &&
          (value === null || value === defaultv)
        ) {
          errors.push(`Field is required`);
        }
        if (it.const !== null && value !== it.const) {
          errors.push(`should be equal to ${it.const}`);
        }
        if (
          it.enum != null &&
          it.enum.length > 0 &&
          it.enum.findIndex(en => en === value) === -1
        ) {
          errors.push(
            `should be equal to one of the allowed values [${it.enum.join(
              ", "
            )}]`
          );
        }
        return errors;
      }
    }))
    .volatile(it => ({
      async asyncValidate(value: V): Promise<string[]> {
        return await it.asyncValidateBase(value);
      },
      syncValidate(value: V): string[] {
        return it.syncValidateBase(value);
      }
    }))
    .volatile(it => ({
      async tryValidate(
        value: IAnything | undefined | null
      ): Promise<string[]> {
        const validities = kind.validate(value, []);
        if (validities.length > 0) {
          return validities.map(validity => validity.message!);
        }
        const errors: string[] = [];
        errors.push(...it.syncValidate(value as V));
        errors.push(...(await it.asyncValidate(value as V)));
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
      get data(): V {
        return toJS(it.value);
      },
      get validating(): boolean {
        return it._validating;
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
        it._validating = true;
        it.addErrors(yield it.tryValidate(it.value));
        it._validating = false;
      })
    }))
    .actions(it => ({
      async sync(value: V): Promise<void> {
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
