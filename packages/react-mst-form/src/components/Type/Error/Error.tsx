import * as React from "react";
import { Component, ReactNode } from "react";

import { observer } from "mobx-react";
import { IType } from "reactive-json-schema";

import FormHelperText from "@material-ui/core/FormHelperText";

export interface IErrorProps {
  type: IType;
}

// tslint:disable-next-line:no-empty-interface
export interface IErrorStates {}

@observer
export default class Error extends Component<IErrorProps, IErrorStates> {
  public static getError(type: IType): string | null {
    if (type.valid || !type.errors.length) {
      return null;
    }
    return type.meta.error || type.errors!.join(", ");
  }

  public render(): ReactNode {
    const { type } = this.props;
    const error = Error.getError(type);
    return error && <FormHelperText error={true}>{error}</FormHelperText>;
  }
}
