import { CSSProperties, WithStyles } from "@material-ui/core/styles/withStyles";
import { IFormConfig } from "react-mst-form";

export interface IAppStyles {
  root: CSSProperties;
  container: CSSProperties;
  form: CSSProperties;
  paper: CSSProperties;
  submit: CSSProperties;
}

export interface IAppStyleProps extends WithStyles<keyof IAppStyles> {}

export interface IAppProps {
  style?: CSSProperties;
  className?: string;
}

export interface IAppStates {
  width: string;
  height: string;
  config: IFormConfig;
}
