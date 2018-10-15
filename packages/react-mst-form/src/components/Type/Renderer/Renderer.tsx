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
import { ILayout } from "../../../models/Section";

import Array from "../Array";
import Boolean from "../Boolean";
import Color from "../Color";
import Multiline from "../Multiline";
import Number from "../Number";
import Object from "../Object";
import String from "../String";

export interface IRenderer {
  render(type: IType, form: IForm, layout?: ILayout): ReactNode;
}

export default class Renderer implements IRenderer {
  public render(type: IType, form: IForm, layout: ILayout = []): ReactNode {
    switch (type.type) {
      case "object":
        return (
          <Object
            type={type as IObject}
            form={form}
            layout={layout}
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
        switch (type.meta.component) {
          case "color":
            return <Color type={type as IString} form={form} />;
          case "textarea":
            return <Multiline type={type as IString} form={form} />;
          default:
            return <String type={type as IString} form={form} />;
        }
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
