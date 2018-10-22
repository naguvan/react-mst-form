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

import { IForm } from "../../../../models/Form";

import Array from "../../Array";
import Boolean from "../../Boolean";
import Number from "../../Number";
import Object from "../../Object";
import String from "../../String";

import { IIconRenderer } from "../Icon";

export interface IRenderContext<T extends IType = IType> {
  type: T;
  form: IForm;
  layout?: ILayout;
  iconer: IIconRenderer;
}

export interface ITypeRenderer {
  render(context: IRenderContext): ReactNode;
}

export default class TypeRenderer implements ITypeRenderer {
  public render(context: IRenderContext): ReactNode {
    const { type, form } = context;
    switch (type.type) {
      case "object":
        return (
          <Object
            context={context as IRenderContext<IObject>}
            renderer={this}
          />
        );
      case "number":
        return <Number context={context as IRenderContext<INumber>} />;
      case "boolean":
        return <Boolean context={context as IRenderContext<IBoolean>} />;
      case "array":
        return (
          <Array context={context as IRenderContext<IArray>} renderer={this} />
        );
      case "string":
        return <String context={context as IRenderContext<IString>} />;
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
