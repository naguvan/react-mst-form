import { WithStyles } from "@material-ui/core";
import { IFormConfig } from "../../src/types";

export interface ISchemaStyles {
  paper: React.CSSProperties;
}

export interface ISchemaStyleProps extends WithStyles<keyof ISchemaStyles> {}

export interface ISchemaProps {
  style?: React.CSSProperties;
  className?: string;
  config: IFormConfig;
  onConfig(config: IFormConfig): void;
}

export interface ISchemaStates {
  config: string;
}
