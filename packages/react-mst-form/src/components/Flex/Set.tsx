import * as React from "react";
import { Component, ReactNode } from "react";

import { CSSProperties, WithStyles } from "@material-ui/core/styles/withStyles";
import withStyles from "@material-ui/core/styles/withStyles";
import classNames from "classnames";

export interface IFlexSetStyles {
  root: CSSProperties;
  center: CSSProperties;
}

export interface IFlexSetStyleProps extends WithStyles<keyof IFlexSetStyles> {}

export interface IFlexSetProps {
  direction: "row" | "column";
  fluid?: boolean;
  style?: CSSProperties;
  className?: string;
}

export interface IFlexSetStates {}

export class Set extends Component<
  IFlexSetProps & IFlexSetStyleProps,
  IFlexSetStates
> {
  public render(): ReactNode {
    const { direction, children, fluid = false } = this.props;
    const extra = fluid && { flex: undefined };
    const { className, classes, style } = this.props;
    const root: string = classNames(classes!.root, className);
    return (
      <div
        className={root}
        style={{ ...style, ...extra, ...{ flexDirection: direction } }}
      >
        {children}
      </div>
    );
  }
}

export default withStyles<keyof IFlexSetStyles, {}>({
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
    display: "flex",
    alignSets: "center",
    justifyContent: "center",
    paddingLeft: 5,
    paddingRight: 5
  }
})(Set);
