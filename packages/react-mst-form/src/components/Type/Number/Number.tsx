import * as React from "react";
import { ReactNode } from "react";

import { observer } from "mobx-react";
import { INumber } from "reactive-json-schema";

import Type, { ITypeProps, ITypeStates } from "../Type";

import Numeric from "./Numeric";
import Radios from "./Radios";
import Range from "./Range";

import { IRenderContext } from "../Renderer/Type";

export interface INumberProps extends ITypeProps<INumber> {}

export interface INumberStates extends ITypeStates<INumber> {}

@observer
export default class Number extends Type<INumber, INumberProps, INumberStates> {
  protected renderType(context: IRenderContext<INumber>): ReactNode {
    const { type } = context;
    switch (type.meta.component) {
      case "radios":
        return <Radios {...{ context }} />;
      case "range":
        return <Range {...{ context }} />;
      case "text":
      case "select":
      case "number":
      default:
        return <Numeric {...{ context }} />;
    }
  }
}
