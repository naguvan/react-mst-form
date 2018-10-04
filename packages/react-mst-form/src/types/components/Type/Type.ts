import { IType } from "reactive-json-schema";

import { IForm } from "../../models";

export interface ITypeProps<T extends IType> {
  type: T;
  form: IForm;
}

export interface ITypeStates<T extends IType> {}
