import { IModelType, types } from "mobx-state-tree";

import { mappings } from "../Common";
import createValue from "../Value";

import { IValue, IValueAttrs, IValueConfig } from "../Value";

export interface IBooleanAttrs extends IValueAttrs<boolean> {}

export interface IBooleanConfig
  extends IValueConfig<boolean, "boolean">,
    Partial<IBooleanAttrs> {}

export interface IBoolean extends IBooleanAttrs, IValue<boolean, "boolean"> {}

// tslint:disable-next-line:variable-name
export const Boolean: IModelType<
  Partial<IBooleanConfig>,
  IBoolean
> = types.compose(
  "Boolean",
  createValue<boolean, "boolean">("boolean", types.boolean, false),
  types.model({})
);

mappings.boolean = Boolean;
