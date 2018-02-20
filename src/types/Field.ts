export interface ITypeFieldProps<T> {
    value: T;
    default: T;
    name: string;
    disabled: boolean;
    visible: boolean;
    required: boolean;
}

export interface ITypeFieldConfig<T> extends Partial<ITypeFieldProps<T>> {
    readonly type: string;
    readonly title: string;
}

export interface ITypeField<T> extends ITypeFieldProps<T> {
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

export interface IStringFieldProps extends ITypeFieldProps<string> {
    readonly minLength: number;
}

export interface IStringFieldConfig
    extends ITypeFieldConfig<string>,
        Partial<IStringFieldProps> {
}

export interface IStringField extends IStringFieldProps, ITypeField<string> {
}

export interface INumberFieldProps extends ITypeFieldProps<number> {
    // readonly type: 'number';
    readonly minimum: number;
    readonly maximum: number;
}

export interface INumberFieldConfig
    extends ITypeFieldConfig<number>,
        Partial<INumberFieldProps> {
}

export interface INumberField extends INumberFieldProps, ITypeField<number> {
}

export interface IBooleanFieldProps extends ITypeFieldProps<boolean> {
}

export interface IBooleanFieldConfig
    extends ITypeFieldConfig<boolean>,
        Partial<IBooleanFieldProps> {
}

export interface IBooleanField extends IBooleanFieldProps, ITypeField<boolean> {
}

export type IFieldConfig =
    | IStringFieldConfig
    | INumberFieldConfig
    | IBooleanFieldConfig;

export type IField = IStringField | INumberField | IBooleanField;
