import { ReactNode } from "react";
import { CSSProperties, WithStyles } from "@material-ui/core/styles/withStyles";

import { IType } from "reactive-json-schema";

import { IForm } from "../models/Form";

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
