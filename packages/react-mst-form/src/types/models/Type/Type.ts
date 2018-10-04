import { IString, IStringConfig } from "./String";
import { INumber, INumberConfig } from "./Number";
import { IBoolean, IBooleanConfig } from "./Boolean";
import { INull, INullConfig } from "./Null";
import { IObject, IObjectConfig } from "./Object";
import { IArray, IArrayConfig } from "./Array";

export type ITypeConfig =
  | IStringConfig
  | INumberConfig
  | IBooleanConfig
  | INullConfig
  | IObjectConfig
  | IArrayConfig;

export type IType = IString | INumber | IBoolean | INull | IObject | IArray;
