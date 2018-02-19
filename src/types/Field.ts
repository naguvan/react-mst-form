export interface ITypeFieldConfig<T, V> {
    readonly type: T;
    readonly required?: boolean;
    value?: V;
    name?: string;
    title: string;
}

export interface ITypeField<T, V> extends ITypeFieldConfig<T, V> {
    setValue(value: V): void;
    setName(name: string): void;
    setTitle(title: string): void;
}

export interface IStringFieldConfig extends ITypeFieldConfig<'string', string> {
    readonly minLength: number;
}

export interface IStringField
    extends IStringFieldConfig,
        ITypeField<'string', string> {}

export interface INumberFieldConfig extends ITypeFieldConfig<'number', number> {
    readonly minimum: number;
    readonly maximum: number;
}

export interface INumberField
    extends INumberFieldConfig,
        ITypeField<'number', number> {}

export interface IBooleanFieldConfig
    extends ITypeFieldConfig<'boolean', boolean> {}

export interface IBooleanField
    extends IBooleanFieldConfig,
        ITypeField<'boolean', boolean> {}

export type IFieldConfig =
    | IStringFieldConfig
    | INumberFieldConfig
    | IBooleanFieldConfig;

export type IField = IStringField | INumberField | IBooleanField;
