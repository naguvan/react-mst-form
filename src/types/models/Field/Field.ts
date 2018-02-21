import { IString, IStringConfig } from './String';
import { INumber, INumberConfig } from './Number';
import { IBoolean, IBooleanConfig } from './Boolean';

export type IFieldConfig = IStringConfig | INumberConfig | IBooleanConfig;

export type IField = IString | INumber | IBoolean;
