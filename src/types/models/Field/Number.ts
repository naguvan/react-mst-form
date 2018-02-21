import { IValue, IValueAttrs, IValueConfig } from './Value';

export interface INumberAttrs extends IValueAttrs<number> {
    readonly minimum: number;
    readonly maximum: number;
}

export interface INumberConfig
    extends IValueConfig<number>,
        Partial<INumberAttrs> {}

export interface INumber extends INumberAttrs, IValue<number> {}
