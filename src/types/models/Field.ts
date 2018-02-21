export interface IValueAttrs<T> {
    value: T;
    default: T;
    name: string;
    disabled: boolean;
    visible: boolean;
    required: boolean;
}

export interface IValueConfig<T> extends Partial<IValueAttrs<T>> {
    readonly type: string;
    readonly title: string;
}

export interface IValue<T> extends IValueAttrs<T> {
    readonly type: string;
    readonly modified: boolean;
    readonly validating: boolean;
    readonly syncing: boolean;
    readonly valid: boolean;
    readonly title: string;
    readonly errors: Array<string>;
    readonly initial: T;
    setValue(value: T): void;
    setName(name: string): void;
    setTitle(title: string): void;
    setRequired(required: boolean): void;
    setDisabled(disabled: boolean): void;
    setVisible(visible: boolean): void;
    addError(error: string): void;
    addErrors(errors: Array<string>): void;
    clearError(): void;
    reset(): void;
    validate(): Promise<void>;
}

export interface IStringAttrs extends IValueAttrs<string> {
    readonly minLength: number;
}

export interface IStringConfig
    extends IValueConfig<string>,
        Partial<IStringAttrs> {
}

export interface IString extends IStringAttrs, IValue<string> {
}

export interface INumberAttrs extends IValueAttrs<number> {
    readonly minimum: number;
    readonly maximum: number;
}

export interface INumberConfig
    extends IValueConfig<number>,
        Partial<INumberAttrs> {
}

export interface INumber extends INumberAttrs, IValue<number> {
}

export interface IBooleanAttrs extends IValueAttrs<boolean> {
}

export interface IBooleanConfig
    extends IValueConfig<boolean>,
        Partial<IBooleanAttrs> {
}

export interface IBoolean extends IBooleanAttrs, IValue<boolean> {
}

export type IFieldConfig =
    | IStringConfig
    | INumberConfig
    | IBooleanConfig;

export type IField = IString | INumber | IBoolean;
