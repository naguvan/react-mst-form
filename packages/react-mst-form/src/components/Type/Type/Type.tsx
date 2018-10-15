import * as React from "react";
import { Component, ReactNode } from "react";

import { IType } from "reactive-json-schema";
import { IForm } from "../../../models/Form";

export interface ITypeProps<T extends IType> {
  type: T;
  form: IForm;
}

// tslint:disable-next-line:no-empty-interface
export interface ITypeStates<T extends IType> {}

export default abstract class Type<
  T extends IType,
  P extends ITypeProps<T>,
  S extends ITypeStates<T>
> extends Component<P, S> {
  public render(): ReactNode {
    const { type, form } = this.props;
    const { visible, name } = type.meta;
    return (
      visible && (
        <div
          key={name!}
          style={{
            width: "100%"
          }}
        >
          {this.renderType(type, form)}
        </div>
      )
    );
  }

  protected abstract renderType(type: T, form: IForm): ReactNode;
}
