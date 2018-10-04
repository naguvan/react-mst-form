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

import { IForm } from "../../types";

import String from "./String";
import Number from "./Number";
import Boolean from "./Boolean";
import Color from "./Color";
import Object from "./Object";
import Array from "./Array";

export function renderer(type: IType, form: IForm): ReactNode {
  switch (type.type) {
    case "object":
      return (
        <Object
          type={type as IObject}
          form={form}
          layout={[]}
          // TODO: find alternate configuration
          // layout={(type as IObject).layout!}
        />
      );
    case "number":
      return <Number type={type as INumber} form={form} />;
    case "boolean":
      return <Boolean type={type as IBoolean} form={form} />;
    case "array":
      return <Array type={type as IArray} form={form} />;
    case "string":
      if (type.component === "color") {
        return <Color type={type as IString} form={form} />;
      }
    default:
      return <String type={type as IString} form={form} />;
  }
}
