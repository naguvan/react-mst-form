export interface IValueFieldProps<T> {
    value: T;
    default: T;
    name: string;
    disabled: boolean;
    visible: boolean;
    required: boolean;
}

export interface IValueFieldConfig<T> extends Partial<IValueFieldProps<T>> {
    readonly type: string;
    readonly title: string;
}

export interface IValueField<T> extends IValueFieldProps<T> {
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

export interface IStringFieldAttrs extends IValueFieldProps<string> {
    readonly minLength: number;
}

export interface IStringFieldConfig
    extends IValueFieldConfig<string>,
        Partial<IStringFieldAttrs> {
}

export interface IStringField extends IStringFieldAttrs, IValueField<string> {
}

export interface INumberFieldAttrs extends IValueFieldProps<number> {
    readonly minimum: number;
    readonly maximum: number;
}

export interface INumberFieldConfig
    extends IValueFieldConfig<number>,
        Partial<INumberFieldAttrs> {
}

export interface INumberField extends INumberFieldAttrs, IValueField<number> {
}

export interface IBooleanFieldAttrs extends IValueFieldProps<boolean> {
}

export interface IBooleanFieldConfig
    extends IValueFieldConfig<boolean>,
        Partial<IBooleanFieldAttrs> {
}

export interface IBooleanField extends IBooleanFieldAttrs, IValueField<boolean> {
}

export type IFieldConfig =
    | IStringFieldConfig
    | INumberFieldConfig
    | IBooleanFieldConfig;

export type IField = IStringField | INumberField | IBooleanField;
