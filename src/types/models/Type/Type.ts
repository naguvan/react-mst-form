import { IString, IStringConfig } from './String';
import { INumber, INumberConfig } from './Number';
import { IBoolean, IBooleanConfig } from './Boolean';
import { INull, INullConfig } from './Null';
import { IObject, IObjectConfig } from './Object';

export type ITypeConfig =
    | IStringConfig
    | INumberConfig
    | IBooleanConfig
    | INullConfig
    | IObjectConfig;

export type IType = IString | INumber | IBoolean | INull | IObject;
