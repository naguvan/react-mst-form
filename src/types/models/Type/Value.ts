export interface IValueAttrs<T> {
    readonly title?: string | null;
    readonly value: T;
    readonly default?: T;
    readonly name: string;
    readonly disabled: boolean;
    readonly visible: boolean;
    readonly required: boolean;
    readonly enum?: Array<T> | null;
    readonly const?: T | null;
    readonly options?: Array<{ label: string; value: T }> | null;
    readonly component?: string | null;
}

export interface IValueConfig<T> extends Partial<IValueAttrs<T>> {
    readonly type: string;
}

export interface IValue<T> extends IValueAttrs<T> {
    readonly type: string;
    readonly modified: boolean;
    readonly validating: boolean;
    readonly syncing: boolean;
    readonly valid: boolean;
    readonly errors: Array<string>;
    readonly initial: T;
    readonly data: T;
    setValue(value: T): void;
    setName(name: string): void;
    setTitle(title: string): void;
    setRequired(required: boolean): void;
    setDisabled(disabled: boolean): void;
    setVisible(visible: boolean): void;
    addError(error: string): void;
    addErrors(errors: Array<string>): void;
    clearErrors(): void;
    reset(): void;
    validate(): Promise<void>;

    sync(value: T): Promise<void>;

    tryValue(value: Object): boolean;
    tryValidate(value: Object | undefined | null): Promise<Array<string>>;

    asyncValidate(value: T): Promise<Array<string>>;
    syncValidate(value: T): Array<string>;
    asyncValidateBase(value: T): Promise<Array<string>>;
    syncValidateBase(value: T): Array<string>;
}
