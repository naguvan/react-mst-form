import { IValue, IValueAttrs, IValueConfig } from './Value';

export interface IBooleanAttrs extends IValueAttrs<boolean> {}

export interface IBooleanConfig
    extends IValueConfig<boolean, 'boolean'>,
        Partial<IBooleanAttrs> {}

export interface IBoolean extends IBooleanAttrs, IValue<boolean, 'boolean'> {}
