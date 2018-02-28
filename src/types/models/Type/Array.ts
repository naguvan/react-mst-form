import { IValue, IValueAttrs, IValueConfig } from './Value';

import { IType, ITypeConfig } from './Type';

export interface IArrayAttrs extends IValueAttrs<Array<Object | null>> {
    readonly additionalItems?: boolean | null;
    readonly minItems?: number | null;
    readonly maxItems?: number | null;
    readonly uniqueItems?: boolean | null;
}

export interface IArrayConfig
    extends IValueConfig<Array<Object | null>, 'array'>,
        Partial<IArrayAttrs> {
    readonly items?: ITypeConfig | Array<ITypeConfig> | null;
}

export interface IArray
    extends IArrayAttrs,
        IValue<Array<Object | null>, 'array'> {
    readonly items?: IType | Array<IType> | null;
    readonly types: Array<ITypeConfig>;
    add(): void;
}
