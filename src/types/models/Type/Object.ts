import { IValue, IValueAttrs, IValueConfig } from './Value';

import { IType, ITypeConfig } from './Type';
import { IFormLayout } from '../Form';

export interface IObjectAttrs extends IValueAttrs<object | null> {
    readonly required?: Array<string> | null;
    readonly minProperties?: number | null;
    readonly maxProperties?: number | null;
    readonly layout?: IFormLayout | null;
}

export interface IObjectConfig
    extends IValueConfig<object | null, 'object'>,
        Partial<IObjectAttrs> {
    readonly properties?: { [key: string]: ITypeConfig };
    readonly additionalProperties?: boolean | ITypeConfig | null;
}

export interface IObject extends IObjectAttrs, IValue<object | null, 'object'> {
    readonly properties?: ReadonlyMap<string, IType> | null;
    readonly additionalProperties?: boolean | IType | null;
    getProperty(property: string): IType | undefined;
    getProperties(): Array<string>;
}
