import { ReactNode } from "react";
import { WithStyles } from "@material-ui/core";

import { IForm } from "../models/Form";
import { IType } from "../models/Type";

export interface IFormStyles {
  root: React.CSSProperties;
  layout: React.CSSProperties;
  set: React.CSSProperties;
  item: React.CSSProperties;
  secondary: React.CSSProperties;
}

export interface IFormStyleProps extends WithStyles<keyof IFormStyles> {}

export interface IFormProps {
  form: IForm;
  style?: React.CSSProperties;
  className?: string;
  renderer(type: IType, form: IForm): ReactNode;
}

export interface IFormStates {
  active: number;
}
