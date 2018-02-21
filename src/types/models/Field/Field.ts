import { IString, IStringConfig } from './String';
import { INumber, INumberConfig } from './Number';
import { IBoolean, IBooleanConfig } from './Boolean';
import { IColor, IColorConfig } from './Color';
import { IEnum, IEnumConfig } from './Enum';

export type IFieldConfig =
    | IStringConfig
    | INumberConfig
    | IBooleanConfig
    | IColorConfig
    | IEnumConfig;

export type IField = IString | INumber | IBoolean | IColor | IEnum;
