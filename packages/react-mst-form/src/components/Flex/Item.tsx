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

export interface IFlexItemStates {}

export class Item extends Component<
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
  root: {
    marginTop: 0,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0,
    flex: "1 1",
    display: "flex"
  },
  center: {
    height: "100%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 5,
    paddingRight: 5
  }
})(Item);
