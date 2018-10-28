import * as React from "react";
import { ChangeEvent, Component, KeyboardEvent, ReactNode } from "react";

import { CSSProperties, WithStyles } from "@material-ui/core/styles/withStyles";
import withStyles from "@material-ui/core/styles/withStyles";

import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";

export interface IMetaStyles {
  editor: CSSProperties;
  paper: CSSProperties;
}

export interface IMetaStyleProps extends WithStyles<keyof IMetaStyles> {}

export interface IMetaProps {
  style?: CSSProperties;
  className?: string;
  meta: string;
  onMeta(meta: string): void;
}

// tslint:disable-next-line:no-empty-interface
export interface IMetaStates {}

export class Meta extends Component<IMetaProps & IMetaStyleProps, IMetaStates> {
  public render(): ReactNode {
    const { className, classes, style } = this.props;
    const { meta } = this.props;
    return (
      <div {...{ className, style }}>
        <Paper square elevation={3} className={classes.paper}>
          <TextField
            InputProps={{ classes: { input: classes.editor } }}
            multiline
            fullWidth
            rows={25}
            value={meta}
            onChange={this.onChange}
          />
        </Paper>
      </div>
    );
  }

  private onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const meta = event.currentTarget.value;
    const { onMeta } = this.props;
    if (onMeta) {
      onMeta(meta);
    }
  };
}

export default withStyles<keyof IMetaStyles, {}>({
  editor: {
    height: 300,
    padding: 10
  },
  paper: {}
})(Meta);
