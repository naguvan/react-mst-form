import { IValue, IValueAttrs, IValueConfig } from './Value';

export interface IBooleanAttrs extends IValueAttrs<boolean> {}

export interface IBooleanConfig
    extends IValueConfig<boolean>,
        Partial<IBooleanAttrs> {
    readonly type: 'boolean';
}

export interface IBoolean extends IBooleanAttrs, IValue<boolean> {}
