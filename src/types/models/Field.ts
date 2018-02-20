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

export interface IStringFieldProps extends IValueFieldProps<string> {
    readonly minLength: number;
}

export interface IStringFieldConfig
    extends IValueFieldConfig<string>,
        Partial<IStringFieldProps> {
}

export interface IStringField extends IStringFieldProps, IValueField<string> {
}

export interface INumberFieldProps extends IValueFieldProps<number> {
    // readonly type: 'number';
    readonly minimum: number;
    readonly maximum: number;
}

export interface INumberFieldConfig
    extends IValueFieldConfig<number>,
        Partial<INumberFieldProps> {
}

export interface INumberField extends INumberFieldProps, IValueField<number> {
}

export interface IBooleanFieldProps extends IValueFieldProps<boolean> {
}

export interface IBooleanFieldConfig
    extends IValueFieldConfig<boolean>,
        Partial<IBooleanFieldProps> {
}

export interface IBooleanField extends IBooleanFieldProps, IValueField<boolean> {
}

export type IFieldConfig =
    | IStringFieldConfig
    | INumberFieldConfig
    | IBooleanFieldConfig;

export type IField = IStringField | INumberField | IBooleanField;
