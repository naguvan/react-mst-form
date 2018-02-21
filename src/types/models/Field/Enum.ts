import { IValue, IValueAttrs, IValueConfig } from './Value';

export interface IEnumAttrs extends IValueAttrs<string> {
    readonly options: Array<{label: string, value: string}>;
}

export interface IEnumConfig extends IValueConfig<string>, Partial<IEnumAttrs> {
    readonly type: 'enum';
}

export interface IEnum extends IEnumAttrs, IValue<string> {}
