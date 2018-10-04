import { IObject } from "reactive-json-schema";

import { ITypeProps, ITypeStates } from "./Type";

import { IFormLayout } from "../../models/Form";

export interface IObjectProps extends ITypeProps<IObject> {
  layout: IFormLayout;
}

export interface IObjectStates extends ITypeStates<IObject> {}
