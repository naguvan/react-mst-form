import * as React from "react";
import { ChangeEvent, Component, MouseEvent, ReactNode } from "react";

import { CSSProperties, WithStyles } from "@material-ui/core/styles/withStyles";
import withStyles from "@material-ui/core/styles/withStyles";

import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";

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

export class Schema extends Component<
  ISchemaProps & ISchemaStyleProps,
  ISchemaStates
> {
  private static getDerivedStateFromPropsFix(
    props: Readonly<ISchemaProps & ISchemaStyleProps>,
    state?: ISchemaStates
  ): ISchemaStates {
    const { config } = props;
    return { config: JSON.stringify(config, null, 2) };
  }

  constructor(props: ISchemaProps & ISchemaStyleProps) {
    super(props);
    this.state = Schema.getDerivedStateFromPropsFix(props);
  }

  public componentWillReceiveProps(
    nextProps: Readonly<ISchemaProps & ISchemaStyleProps>
  ): void {
    if (this.props.config !== nextProps.config) {
      this.setState(state =>
        Schema.getDerivedStateFromPropsFix(nextProps, state)
      );
    }
  }

  public render(): ReactNode {
    const { className, classes, style } = this.props;
    const { config } = this.state;
    return (
      <div {...{ className, style }}>
        <Paper square elevation={3} className={classes.paper}>
          <TextField
            multiline
            fullWidth
            rows={25}
            value={config}
            onChange={this.onChange}
          />
        </Paper>
        <Button
          variant={"contained"}
          color={"primary"}
          disabled={!this.isJSON(config)}
          onClick={this.onSubmit}
        >
          Render
        </Button>
      </div>
    );
  }

  private isJSON(config: string): boolean {
    try {
      return JSON.parse(config);
    } catch {
      return false;
    }
  }

  private onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const config = event.currentTarget.value;
    this.setState(() => ({ config }));
  };

  private onSubmit = (event: MouseEvent<HTMLButtonElement>) => {
    const { config } = this.state;
    const { onConfig } = this.props;
    if (onConfig) {
      onConfig(JSON.parse(config));
    }
  };
}

export default withStyles<keyof ISchemaStyles, {}>({
  paper: {}
})(Schema);
