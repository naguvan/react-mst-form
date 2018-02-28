import { IValue, IValueAttrs, IValueConfig } from './Value';

export interface INumberAttrs extends IValueAttrs<number> {
    readonly minimum?: number;
    readonly maximum?: number;
    readonly multipleOf?: number;
}

export interface INumberConfig
    extends IValueConfig<number, 'number'>,
        Partial<INumberAttrs> {}

export interface INumber extends INumberAttrs, IValue<number, 'number'> {}
