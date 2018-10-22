import * as React from "react";
import { ReactNode } from "react";

import { observer } from "mobx-react";
import { INumber } from "reactive-json-schema";
import { IForm } from "../../../models/Form";

import Type, { ITypeProps, ITypeStates } from "../Type";

import Numeric from "./Numeric";
import Radios from "./Radios";
import Range from "./Range";

export interface INumberProps extends ITypeProps<INumber> {}

export interface INumberStates extends ITypeStates<INumber> {}

@observer
export default class Number extends Type<INumber, INumberProps, INumberStates> {
  protected renderType(type: INumber, form: IForm): ReactNode {
    switch (type.meta.component) {
      case "radios":
        return <Radios type={type} form={form} />;
      case "range":
        return <Range type={type} form={form} />;
      case "text":
      case "select":
      case "number":
      default:
        return <Numeric type={type} form={form} />;
    }
  }
}
