import * as React from "react";
import { Component, ReactNode } from "react";

import { ITypeProps, ITypeStates, IForm } from "../../types";
import { IType } from "../../types";

export default abstract class Base<
  T extends IType,
  P extends ITypeProps<T>,
  S extends ITypeStates<T>
> extends Component<P, S> {
  public render(): ReactNode {
    const { type, form } = this.props;
    const { visible, name } = type;
    return visible ? (
      <div
        key={name!}
        style={{
          width: "100%"
        }}
      >
        {this.renderType(type, form)}
      </div>
    ) : null;
  }

  protected abstract renderType(type: T, form: IForm): ReactNode;
}
