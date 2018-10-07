import * as React from "react";
import { Component, ReactNode } from "react";

import { CSSProperties, WithStyles } from "@material-ui/core/styles/withStyles";
import withStyles from "@material-ui/core/styles/withStyles";
import classNames from "classnames";

import Item from "./Item";
import Set from "./Set";

import { ILayoutBaseProps } from "./Base";

import { ILayoutItem } from "../Model/Item";
import { ILayoutSet } from "../Model/Set";

export interface ILayoutMixedStyles {
  root: CSSProperties;
  set: CSSProperties;
  item: CSSProperties;
}

export interface ILayoutMixedStyleProps
  extends WithStyles<keyof ILayoutMixedStyles> {}

export interface ILayoutMixedProps<T> extends ILayoutBaseProps<T> {
  item: ILayoutItem<T> | ILayoutSet<T>;
}

// tslint:disable-next-line:no-empty-interface
export interface ILayoutMixedStates {}

export class Mixed<T> extends Component<
  ILayoutMixedProps<T> & ILayoutMixedStyleProps,
  ILayoutMixedStates
> {
  public render(): ReactNode {
    const { path, item, render, center, direction } = this.props;
    const { className: clazz, classes, style } = this.props;
    const className: string = classNames(classes!.root, clazz);
    const props = { center, path, direction, className, style };
    return Array.isArray((item as ILayoutSet<T>).items) ? (
      <Set
        {...props}
        classes={{ set: classes.set, item: classes.item }}
        render={render as any}
        items={item as ILayoutSet<T>}
      />
    ) : (
      <Item
        {...props}
        classes={{ item: classes.item }}
        render={render as any}
        item={item as ILayoutItem<T>}
      />
    );
  }
}

export default withStyles<keyof ILayoutMixedStyles, {}>({
  item: {},
  root: {},
  set: {}
})(Mixed);
