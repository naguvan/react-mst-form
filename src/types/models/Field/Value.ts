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