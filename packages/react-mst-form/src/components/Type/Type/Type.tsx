import * as React from "react";
import { Component, ReactNode } from "react";

import { IType } from "reactive-json-schema";
import { IRenderContext } from "../Renderer/Type";

export interface ITypeProps<T extends IType> {
  context: IRenderContext<T>;
}

// tslint:disable-next-line:no-empty-interface
export interface ITypeStates<T extends IType> {}

export default abstract class Type<
  T extends IType,
  P extends ITypeProps<T>,
  S extends ITypeStates<T>
> extends Component<P, S> {
  public render(): ReactNode {
    const { context } = this.props;
    const { type } = context;
    const { visible, name } = type.meta;
    return (
      visible && (
        <div
          key={name!}
          style={{
            width: "100%"
          }}
        >
          {this.renderType(context)}
        </div>
      )
    );
  }

  protected abstract renderType(context: IRenderContext<T>): ReactNode;
}
