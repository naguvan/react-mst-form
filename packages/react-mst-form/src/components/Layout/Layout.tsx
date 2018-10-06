import * as React from "react";
import { Component, ReactNode } from "react";

import { CSSProperties, WithStyles } from "@material-ui/core/styles/withStyles";
import withStyles from "@material-ui/core/styles/withStyles";
import classNames from "classnames";

import { arrange } from "./Config";
import Set from "./Set";

import { ILayoutSet } from "./Common";

export interface ILayoutStyles {
  root: CSSProperties;
  set: CSSProperties;
  item: CSSProperties;
}

export interface ILayoutStyleProps extends WithStyles<keyof ILayoutStyles> {}

export interface ILayoutProps<T> {
  path?: string;
  center?: boolean;
  direction?: "row" | "column";
  // styles?: ILayoutStyles;
  render: (item: T) => ReactNode;
  items: ILayoutSet<T> | Array<T | T[]>;
  style?: CSSProperties;
  className?: string;
}

// tslint:disable-next-line:no-empty-interface
export interface ILayoutStates {}

export class Layout<T> extends Component<
  ILayoutProps<T> & ILayoutStyleProps,
  ILayoutStates
> {
  public render(): ReactNode {
    const { path = "0", items, render, center = false } = this.props;
    const { direction = "column" } = this.props;
    const { className, classes, style } = this.props;
    const root: string = classNames(classes!.root, className);
    const props = { path, direction, center, className: root };
    return (
      <Set
        {...props}
        classes={{ set: classes.set, item: classes.item }}
        render={render as any}
        items={Array.isArray(items) ? arrange(items) : items}
      />
    );
  }
}

export default withStyles<keyof ILayoutStyles, {}>({
  item: {
    flex: 1,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0
  },
  root: {},
  set: {
    display: "flex",
    flex: 1,
    justifyContent: "space-between",
    listStyle: "none",
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0
  }
})(Layout);
