import { ReactNode } from "react";
import { CSSProperties, WithStyles } from "@material-ui/core/styles/withStyles";

import { IForm } from "../models/Form";
import { IType } from "../models/Type";

export interface IFormStyles {
  root: CSSProperties;
  layout: CSSProperties;
  set: CSSProperties;
  item: CSSProperties;
  secondary: CSSProperties;
}

export interface IFormStyleProps extends WithStyles<keyof IFormStyles> {}

export interface IFormProps {
  form: IForm;
  style?: CSSProperties;
  className?: string;
  renderer(type: IType, form: IForm): ReactNode;
}

export interface IFormStates {
  active: number;
}
