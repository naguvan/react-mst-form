import { IValue, IValueAttrs, IValueConfig } from './Value';

export interface INullAttrs extends IValueAttrs<null> {}

export interface INullConfig
    extends IValueConfig<null>,
        Partial<INullAttrs> {
    readonly type: 'null';
}

export interface INull extends INullAttrs, IValue<null> {}
