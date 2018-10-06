import * as React from "react";
import { ReactNode } from "react";

import {
  IArray,
  IBoolean,
  INumber,
  IObject,
  IString,
  IType
} from "reactive-json-schema";

import { IForm } from "../../../models/Form";

import Array from "../Array";
import Boolean from "../Boolean";
import Color from "../Color";
import Number from "../Number";
import Object from "../Object";
import String from "../String";

export interface IRenderer {
  render(type: IType, form: IForm): ReactNode;
}

export default class Renderer implements IRenderer {
  public render(type: IType, form: IForm): ReactNode {
    switch (type.type) {
      case "object":
        return (
          <Object
            type={type as IObject}
            form={form}
            layout={[]}
            renderer={this}
            // TODO: find alternate configuration
            // layout={(type as IObject).layout!}
          />
        );
      case "number":
        return <Number type={type as INumber} form={form} />;
      case "boolean":
        return <Boolean type={type as IBoolean} form={form} />;
      case "array":
        return <Array type={type as IArray} form={form} renderer={this} />;
      case "string":
        if (type.component === "color") {
          return <Color type={type as IString} form={form} />;
        }
      default:
        return <String type={type as IString} form={form} />;
    }
  }
}
