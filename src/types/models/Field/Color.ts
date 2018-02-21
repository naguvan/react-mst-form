import { IValue, IValueAttrs, IValueConfig } from './Value';

export interface IColorAttrs extends IValueAttrs<string> {}

export interface IColorConfig
    extends IValueConfig<string>,
        Partial<IColorAttrs> {}

export interface IColor extends IColorAttrs, IValue<string> {}
