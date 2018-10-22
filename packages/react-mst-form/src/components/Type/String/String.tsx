import * as React from "react";
import { ReactNode } from "react";

import { observer } from "mobx-react";
import { IString } from "reactive-json-schema";

import Color from "./Color";
import Multiline from "./Multiline";
import Text from "./Text";

import Type, { ITypeProps, ITypeStates } from "../Type";

import { IRenderContext } from "../Renderer/Type";

export interface IStringProps extends ITypeProps<IString> {}

export interface IStringStates extends ITypeStates<IString> {}

@observer
export default class String extends Type<IString, IStringProps, IStringStates> {
  protected renderType(context: IRenderContext<IString>): ReactNode {
    const { type } = context;
    switch (type.meta.component) {
      case "color":
        return <Color {...{ context }} />;
      case "textarea":
        return <Multiline {...{ context }} />;
      default:
        return <Text {...{ context }} />;
    }
  }
}
