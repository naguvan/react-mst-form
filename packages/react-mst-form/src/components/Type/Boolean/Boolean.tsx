import * as React from "react";
import { ReactNode } from "react";

import { observer } from "mobx-react";
import { IBoolean } from "reactive-json-schema";

import Type, { ITypeProps, ITypeStates } from "../Type";

import Checkbox from "./Checkbox";
import Radios from "./Radios";
import Select from "./Select";
import Switch from "./Switch";

import { IRenderContext } from "../Renderer/Type";

export interface IBooleanProps extends ITypeProps<IBoolean> {}

export interface IBooleanStates extends ITypeStates<IBoolean> {}

@observer
export default class Boolean extends Type<
  IBoolean,
  IBooleanProps,
  IBooleanStates
> {
  protected renderType(context: IRenderContext<IBoolean>): ReactNode {
    const { type } = context;
    switch (type.meta.component) {
      case "select":
        return <Select {...{ context }} />;
      case "checkbox":
        return <Checkbox {...{ context }} />;
      case "radios":
        return <Radios {...{ context }} />;
      case "switch":
      default:
        return <Switch {...{ context }} />;
    }
  }
}
