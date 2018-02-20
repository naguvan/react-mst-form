export interface ITypeFieldProps<T, V> {
    value: V;
    name: string;
    disabled: boolean;
    visible: boolean;
    required: boolean;
}

export interface ITypeFieldConfig<T, V> extends Partial<ITypeFieldProps<T, V>> {
    readonly type: T;
    readonly title: string;
}

export interface ITypeField<T, V> extends ITypeFieldProps<T, V> {
    readonly type: T;
    title: string;
    error: string;
    setValue(value: V): void;
    setName(name: string): void;
    setTitle(title: string): void;
    setRequired(required: boolean): void;
    setDisabled(disabled: boolean): void;
    setVisible(visible: boolean): void;
    setError(error: string): void;
}

export interface IStringFieldProps extends ITypeFieldProps<'string', string> {
    readonly minLength: number;
}

export interface IStringFieldConfig
    extends ITypeFieldConfig<'string', string>,
        Partial<IStringFieldProps> {}

export interface IStringField
    extends IStringFieldProps,
        ITypeField<'string', string> {}

export interface INumberFieldProps extends ITypeFieldProps<'number', number> {
    readonly minimum: number;
    readonly maximum: number;
}

export interface INumberFieldConfig
    extends ITypeFieldConfig<'number', number>,
        Partial<INumberFieldProps> {}

export interface INumberField
    extends INumberFieldProps,
        ITypeField<'number', number> {}

export interface IBooleanFieldProps
    extends ITypeFieldProps<'boolean', boolean> {}

export interface IBooleanFieldConfig
    extends ITypeFieldConfig<'boolean', boolean>,
        Partial<IBooleanFieldProps> {}

export interface IBooleanField
    extends IBooleanFieldProps,
        ITypeField<'boolean', boolean> {}

export type IFieldConfig =
    | IStringFieldConfig
    | INumberFieldConfig
    | IBooleanFieldConfig;

export type IField = IStringField | INumberField | IBooleanField;
