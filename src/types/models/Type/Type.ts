import { IString, IStringConfig } from './String';
import { INumber, INumberConfig } from './Number';
import { IBoolean, IBooleanConfig } from './Boolean';
import { IColor, IColorConfig } from './Color';

export type ITypeConfig =
    | IStringConfig
    | INumberConfig
    | IBooleanConfig
    | IColorConfig;

export type IType = IString | INumber | IBoolean | IColor;
