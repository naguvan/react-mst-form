import { IValue, IValueAttrs, IValueConfig } from './Value';

import { IType, ITypeConfig } from './Type';
import { IFormLayout } from '../Form';

export interface IObjectAttrs extends IValueAttrs<object | null> {
    readonly requiredx?: Array<string>; // TODO: fix it
    readonly minProperties?: number;
    readonly maxProperties?: number;
    readonly layout?: IFormLayout;
}

export interface IObjectConfig
    extends IValueConfig<object | null>,
        Partial<IObjectAttrs> {
    readonly type: 'object';
    readonly properties?: { [key: string]: ITypeConfig };
    readonly additionalProperties?: boolean | ITypeConfig;
}

export interface IObject extends IObjectAttrs, IValue<object | null> {
    readonly properties?: ReadonlyMap<string, IType> | null;
    readonly additionalProperties?: boolean | IType | null;
    getProperty(property: string): IType | undefined;
    getProperties(): Array<string>;
}
