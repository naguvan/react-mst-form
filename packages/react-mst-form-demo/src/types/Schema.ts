import { CSSProperties, WithStyles } from "@material-ui/core/styles/withStyles";
import { IFormConfig } from "react-mst-form";

export interface ISchemaStyles {
  paper: CSSProperties;
}

export interface ISchemaStyleProps extends WithStyles<keyof ISchemaStyles> {}

export interface ISchemaProps {
  style?: CSSProperties;
  className?: string;
  config: IFormConfig;
  onConfig(config: IFormConfig): void;
}

export interface ISchemaStates {
  config: string;
}
