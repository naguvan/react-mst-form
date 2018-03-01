import { IValue, IValueAttrs, IValueConfig } from './Value';

export interface INumberAttrs extends IValueAttrs<number> {
    readonly minimum?: number | null;
    readonly maximum?: number | null;
    readonly multipleOf?: number | null;
}

export interface INumberConfig
    extends IValueConfig<number, 'number'>,
        Partial<INumberAttrs> {}

export interface INumber extends INumberAttrs, IValue<number, 'number'> {}
