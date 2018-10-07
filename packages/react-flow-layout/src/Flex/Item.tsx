import * as React from "react";
import { Component, ReactNode } from "react";

import { CSSProperties, WithStyles } from "@material-ui/core/styles/withStyles";
import withStyles from "@material-ui/core/styles/withStyles";
import classNames from "classnames";

export interface IFlexItemStyles {
  root: CSSProperties;
  center: CSSProperties;
}

export interface IFlexItemStyleProps
  extends WithStyles<keyof IFlexItemStyles> {}

export interface IFlexItemProps {
  center?: boolean;
  fluid?: boolean;
  style?: CSSProperties;
  className?: string;
}

// tslint:disable-next-line:no-empty-interface
export interface IFlexItemStates {}

export class FlexItem extends Component<
  IFlexItemProps & IFlexItemStyleProps,
  IFlexItemStates
> {
  public render(): ReactNode {
    const { center = false, fluid = false, children } = this.props;
    const extra = fluid && { flex: undefined };
    const { className, classes, style } = this.props;
    const root: string = classNames(classes!.root, className);
    return (
      <div className={root} style={{ ...style, ...extra }}>
        {center ? <div className={classes.center}>{children}</div> : children}
      </div>
    );
  }
}

export default withStyles<keyof IFlexItemStyles, {}>({
  center: {
    alignItems: "center",
    display: "flex",
    height: "100%",
    justifyContent: "center",
    paddingLeft: 5,
    paddingRight: 5,
    width: "100%"
  },
  root: {
    display: "flex",
    flex: "1 1",
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0
  }
})(FlexItem);
