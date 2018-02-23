import { IValue, IValueAttrs, IValueConfig } from './Value';

import { IType, ITypeConfig } from './Type';

export interface IObjectAttrs extends IValueAttrs<object | null> {
    readonly requiredx?: Array<string>; // TODO: fix it
    readonly additionalProperties?: boolean | IType;
    readonly minProperties?: number;
    readonly maxProperties?: number;
}

export interface IObjectConfig
    extends IValueConfig<object | null>,
        Partial<IObjectAttrs> {
    readonly type: 'object';
    readonly properties?: { [key: string]: ITypeConfig };
}

export interface IObject extends IObjectAttrs, IValue<object | null> {
    readonly properties?: ReadonlyMap<string, IType>;
}
