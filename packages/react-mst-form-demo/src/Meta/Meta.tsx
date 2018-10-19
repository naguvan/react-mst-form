import * as React from "react";
import { ChangeEvent, Component, KeyboardEvent, ReactNode } from "react";

import { CSSProperties, WithStyles } from "@material-ui/core/styles/withStyles";
import withStyles from "@material-ui/core/styles/withStyles";

import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";

import { IMetaConfig } from "react-mst-form";

export interface IMetaStyles {
  editor: CSSProperties;
  paper: CSSProperties;
}

export interface IMetaStyleProps extends WithStyles<keyof IMetaStyles> {}

export interface IMetaProps {
  style?: CSSProperties;
  className?: string;
  meta?: IMetaConfig;
  onMeta(meta: IMetaConfig): void;
}

export interface IMetaStates {
  meta: string;
}

export class Meta extends Component<IMetaProps & IMetaStyleProps, IMetaStates> {
  private static getDerivedStateFromPropsFix(
    props: Readonly<IMetaProps & IMetaStyleProps>,
    state?: IMetaStates
  ): IMetaStates {
    const { meta = {} } = props;
    return { meta: JSON.stringify(meta, null, 2) };
  }

  constructor(props: IMetaProps & IMetaStyleProps) {
    super(props);
    this.state = Meta.getDerivedStateFromPropsFix(props);
  }

  public componentWillReceiveProps(
    nextProps: Readonly<IMetaProps & IMetaStyleProps>
  ): void {
    if (this.props.meta !== nextProps.meta) {
      this.setState(state =>
        Meta.getDerivedStateFromPropsFix(nextProps, state)
      );
    }
  }

  public render(): ReactNode {
    const { className, classes, style } = this.props;
    const { meta } = this.state;
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
            onKeyDown={this.onSubmit}
          />
        </Paper>
      </div>
    );
  }

  private isJSON(meta: string): boolean {
    try {
      return JSON.parse(meta);
    } catch {
      return false;
    }
  }

  private onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const meta = event.currentTarget.value;
    this.setState(() => ({ meta }));
  };

  private onSubmit = (event: KeyboardEvent<HTMLInputElement>) => {
    const { meta } = this.state;
    if (this.isJSON(meta) && event.shiftKey && event.keyCode === 13) {
      const { onMeta } = this.props;
      if (onMeta) {
        onMeta(JSON.parse(meta));
      }
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
