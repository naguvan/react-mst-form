import * as React from "react";
import { ChangeEvent, Component, KeyboardEvent, ReactNode } from "react";

import { CSSProperties, WithStyles } from "@material-ui/core/styles/withStyles";
import withStyles from "@material-ui/core/styles/withStyles";

import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";

export interface ISnapshotStyles {
  editor: CSSProperties;
  paper: CSSProperties;
}

export interface ISnapshotStyleProps
  extends WithStyles<keyof ISnapshotStyles> {}

export interface ISnapshotProps {
  style?: CSSProperties;
  className?: string;
  snapshot: string;
  onSnapshot(snapshot: string): void;
}

// tslint:disable-next-line:no-empty-interface
export interface ISnapshotStates {}

export class Snapshot extends Component<
  ISnapshotProps & ISnapshotStyleProps,
  ISnapshotStates
> {
  public render(): ReactNode {
    const { className, classes, style } = this.props;
    const { snapshot } = this.props;
    return (
      <div {...{ className, style }}>
        <Paper square elevation={3} className={classes.paper}>
          <TextField
            InputProps={{ classes: { input: classes.editor } }}
            multiline
            fullWidth
            rows={25}
            value={snapshot}
            onChange={this.onChange}
          />
        </Paper>
      </div>
    );
  }

  private onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const snapshot = event.currentTarget.value;
    const { onSnapshot } = this.props;
    if (onSnapshot) {
      onSnapshot(JSON.parse(snapshot));
    }
  };
}

export default withStyles<keyof ISnapshotStyles, {}>({
  editor: {
    height: 300,
    padding: 10
  },
  paper: {}
})(Snapshot);
