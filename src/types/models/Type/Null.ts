import { IValue, IValueAttrs, IValueConfig } from "./Value";

export interface INullAttrs extends IValueAttrs<null> {}

export interface INullConfig
  extends IValueConfig<null, "null">,
    Partial<INullAttrs> {}

export interface INull extends INullAttrs, IValue<null, "null"> {}
