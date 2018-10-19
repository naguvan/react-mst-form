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
  snapshot?: {};
  onSnapshot(snapshot: {}): void;
}

export interface ISnapshotStates {
  snapshot: string;
}

export class Snapshot extends Component<
  ISnapshotProps & ISnapshotStyleProps,
  ISnapshotStates
> {
  private static getDerivedStateFromPropsFix(
    props: Readonly<ISnapshotProps & ISnapshotStyleProps>,
    state?: ISnapshotStates
  ): ISnapshotStates {
    const { snapshot = {} } = props;
    return { snapshot: JSON.stringify(snapshot, null, 2) };
  }

  constructor(props: ISnapshotProps & ISnapshotStyleProps) {
    super(props);
    this.state = Snapshot.getDerivedStateFromPropsFix(props);
  }

  public componentWillReceiveProps(
    nextProps: Readonly<ISnapshotProps & ISnapshotStyleProps>
  ): void {
    if (this.props.snapshot !== nextProps.snapshot) {
      this.setState(state =>
        Snapshot.getDerivedStateFromPropsFix(nextProps, state)
      );
    }
  }

  public render(): ReactNode {
    const { className, classes, style } = this.props;
    const { snapshot } = this.state;
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
            onKeyDown={this.onSubmit}
          />
        </Paper>
      </div>
    );
  }

  private isJSON(snapshot: string): boolean {
    try {
      return JSON.parse(snapshot);
    } catch {
      return false;
    }
  }

  private onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const snapshot = event.currentTarget.value;
    this.setState(() => ({ snapshot }));
  };

  private onSubmit = (event: KeyboardEvent<HTMLInputElement>) => {
    const { snapshot } = this.state;
    if (this.isJSON(snapshot) && event.shiftKey && event.keyCode === 13) {
      const { onSnapshot } = this.props;
      if (onSnapshot) {
        onSnapshot(JSON.parse(snapshot));
      }
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
