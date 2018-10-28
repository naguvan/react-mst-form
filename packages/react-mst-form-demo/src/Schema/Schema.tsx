import * as React from "react";
import { ChangeEvent, Component, KeyboardEvent, ReactNode } from "react";

import { CSSProperties, WithStyles } from "@material-ui/core/styles/withStyles";
import withStyles from "@material-ui/core/styles/withStyles";

import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";

export interface ISchemaStyles {
  editor: CSSProperties;
  paper: CSSProperties;
}

export interface ISchemaStyleProps extends WithStyles<keyof ISchemaStyles> {}

export interface ISchemaProps {
  style?: CSSProperties;
  className?: string;
  config: string;
  onConfig(config: string): void;
}

// tslint:disable-next-line:no-empty-interface
export interface ISchemaStates {}

export class Schema extends Component<
  ISchemaProps & ISchemaStyleProps,
  ISchemaStates
> {
  public render(): ReactNode {
    const { className, classes, style } = this.props;
    const { config } = this.props;
    return (
      <div {...{ className, style }}>
        <Paper square elevation={3} className={classes.paper}>
          <TextField
            InputProps={{ classes: { input: classes.editor } }}
            multiline
            fullWidth
            rows={25}
            value={config}
            onChange={this.onChange}
          />
        </Paper>
      </div>
    );
  }

  private onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const config = event.currentTarget.value;
    const { onConfig } = this.props;
    if (onConfig) {
      onConfig(config);
    }
  };
}

export default withStyles<keyof ISchemaStyles, {}>({
  editor: {
    height: 300,
    padding: 10
  },
  paper: {}
})(Schema);
