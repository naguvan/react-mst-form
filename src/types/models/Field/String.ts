import { IValue, IValueAttrs, IValueConfig } from './Value';

export interface IStringAttrs extends IValueAttrs<string> {
    readonly minLength: number;
}

export interface IStringConfig
    extends IValueConfig<string>,
        Partial<IStringAttrs> {}

export interface IString extends IStringAttrs, IValue<string> {}
