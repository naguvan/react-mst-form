import * as React from "react";
import { ReactNode } from "react";

import { observer } from "mobx-react";
import { IString } from "reactive-json-schema";
import { IForm } from "../../../models/Form";

import Color from "./Color";
import Multiline from "./Multiline";
import Text from "./Text";

import Type, { ITypeProps, ITypeStates } from "../Type";

export interface IStringProps extends ITypeProps<IString> {}

export interface IStringStates extends ITypeStates<IString> {}

@observer
export default class String extends Type<IString, IStringProps, IStringStates> {
  protected renderType(type: IString, form: IForm): ReactNode {
    switch (type.meta.component) {
      case "color":
        return <Color type={type} form={form} />;
      case "textarea":
        return <Multiline type={type} form={form} />;
      default:
        return <Text type={type} form={form} />;
    }
  }
}
