import { IString, IStringConfig } from './String';
import { INumber, INumberConfig } from './Number';
import { IBoolean, IBooleanConfig } from './Boolean';
import { INull, INullConfig } from './Null';

export type ITypeConfig =
    | IStringConfig
    | INumberConfig
    | IBooleanConfig
    | INullConfig;

export type IType = IString | INumber | IBoolean | INull;
