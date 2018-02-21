import { IString, IStringConfig } from './String';
import { INumber, INumberConfig } from './Number';
import { IBoolean, IBooleanConfig } from './Boolean';
import { IColor, IColorConfig } from './Color';

export type IFieldConfig =
    | IStringConfig
    | INumberConfig
    | IBooleanConfig
    | IColorConfig;

export type IField = IString | INumber | IBoolean | IColor;
