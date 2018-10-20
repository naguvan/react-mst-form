import * as React from "react";
import { ReactNode } from "react";

import { observer } from "mobx-react";
import { IBoolean } from "reactive-json-schema";
import { IForm } from "../../../models/Form";

import Type, { ITypeProps, ITypeStates } from "../Type";

import Checkbox from "./Checkbox";
import Switch from "./Switch";

export interface IBooleanProps extends ITypeProps<IBoolean> {}

export interface IBooleanStates extends ITypeStates<IBoolean> {}

@observer
export default class Boolean extends Type<
  IBoolean,
  IBooleanProps,
  IBooleanStates
> {
  protected renderType(type: IBoolean, form: IForm): ReactNode {
    switch (type.meta.component) {
      case "checkbox":
        return <Checkbox type={type} form={form} />;
      case "switch":
      default:
        return <Switch type={type} form={form} />;
    }
  }
}
