import { ReactNode } from "react";

import { IType } from "reactive-json-schema";

import { IForm } from "../../../../models/Form";

export interface IIconRenderer {
  render(icon: string, context?: IIconContext): ReactNode;
}

export interface IIconContext<T extends IType = IType> {
  type: T;
  form: IForm;
}

export default class IconRenderer implements IIconRenderer {
  public render(icon: string, context?: IIconContext): ReactNode {
    return icon;
  }
}
