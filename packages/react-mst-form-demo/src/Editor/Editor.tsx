import * as React from "react";
import { ChangeEvent, Component, ReactNode } from "react";

import { CSSProperties, WithStyles } from "@material-ui/core/styles/withStyles";
import withStyles from "@material-ui/core/styles/withStyles";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import InputBase from "@material-ui/core/InputBase";

export interface IEditorStyles {
  editor: CSSProperties;
  card: CSSProperties;
  content: CSSProperties;
  header: CSSProperties;
}

export interface IEditorStyleProps extends WithStyles<keyof IEditorStyles> {}

export interface IEditorProps {
  style?: CSSProperties;
  className?: string;
  title: string;
  value: string;
  onChange(value: string): void;
}

// tslint:disable-next-line:no-empty-interface
export interface IEditorStates {}

export class Editor extends Component<
  IEditorProps & IEditorStyleProps,
  IEditorStates
> {
  public render(): ReactNode {
    const { className, classes, style } = this.props;
    const { value, title } = this.props;
    return (
      <div {...{ className, style }}>
        <Card square elevation={3} className={classes.card}>
          <CardHeader title={title} className={classes.header} />
          <CardContent className={classes.content}>
            <InputBase
              classes={{ input: classes.editor }}
              multiline
              fullWidth
              rows={25}
              value={value}
              onChange={this.onChange}
            />
          </CardContent>
        </Card>
      </div>
    );
  }

  private onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    const { onChange } = this.props;
    if (onChange) {
      onChange(value);
    }
  };
}

export default withStyles<keyof IEditorStyles, {}>({
  card: {},
  content: {
    paddingTop: 2
  },
  editor: {
    height: 300,
    padding: 10
  },
  header: {
    paddingBottom: 2
  }
})(Editor);
