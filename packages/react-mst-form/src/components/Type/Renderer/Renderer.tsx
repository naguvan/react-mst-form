import * as React from "react";
import { ReactNode } from "react";

import {
  IArray,
  IBoolean,
  ILayout,
  INumber,
  IObject,
  IString,
  IType
} from "reactive-json-schema";

import { IForm } from "../../../models/Form";

import Array from "../Array";
import Boolean from "../Boolean";
import Number from "../Number";
import Object from "../Object";
import String from "../String";

export interface IRenderer {
  render(type: IType, form: IForm, layout?: ILayout): ReactNode;
}

export default class Renderer implements IRenderer {
  public render(type: IType, form: IForm, layout?: ILayout): ReactNode {
    switch (type.type) {
      case "object":
        return (
          <Object
            type={type as IObject}
            form={form}
            layout={layout || type.meta.layout || []}
            renderer={this}
          />
        );
      case "number":
        return <Number type={type as INumber} form={form} />;
      case "boolean":
        return <Boolean type={type as IBoolean} form={form} />;
      case "array":
        return <Array type={type as IArray} form={form} renderer={this} />;
      case "string":
        return <String type={type as IString} form={form} />;
      default:
        throw new Error(
          `${
            type.type
          } is not valid field type configuration for type titled : ${
            type.title
          }`
        );
    }
  }
}
