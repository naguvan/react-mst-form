export interface IValueAttrs<V> {
    readonly title?: string | null;
    readonly value: V | null;
    readonly default?: V | null;
    readonly initial?: V | null;
    readonly name: string | null;
    readonly disabled: boolean | null;
    readonly visible: boolean | null;
    readonly mandatory: boolean | null;
    readonly enum?: Array<V> | null;
    readonly const?: V | null;
    readonly options?: Array<{ label: string; value: V }> | null;
    readonly component?: string | null;
    readonly sequence?: number | null;
    readonly errors?: Array<string> | null;
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
    // readonly errors: Array<string>;
    // readonly initial: V;
    readonly data: V;
    setValue(value: V): void;
    setName(name: string): void;
    setTitle(title: string): void;
    setMandatory(mandatory: boolean): void;
    setDisabled(disabled: boolean): void;
    setVisible(visible: boolean): void;
    addError(error: string): void;
    addErrors(errors: Array<string>): void;
    clearErrors(): void;
    reset(): void;
    validate(): Promise<void>;

    sync(value: V): Promise<void>;

    tryValue(value: Object): boolean;
    tryValidate(value: Object | undefined | null): Promise<Array<string>>;

    asyncValidate(value: V): Promise<Array<string>>;
    syncValidate(value: V): Array<string>;
    asyncValidateBase(value: V): Promise<Array<string>>;
    syncValidateBase(value: V): Array<string>;
}
