import * as React from "react";
import { Component, ReactNode } from "react";

import { ILayoutMixedProps, ILayoutMixedStates } from "../../types";
import { ILayoutMixedStyleProps, ILayoutMixedStyles } from "../../types";

import withStyles from "@material-ui/core/styles/withStyles";
import classNames from "classnames";

import { ILayoutSet, ILayoutItem } from "../../types";

import Item from "./Item";
import Set from "./Set";

export class Mixed<T> extends Component<
  ILayoutMixedProps<T> & ILayoutMixedStyleProps,
  ILayoutMixedStates
> {
  constructor(
    props: ILayoutMixedProps<T> & ILayoutMixedStyleProps,
    context: {}
  ) {
    super(props, context);
  }

  public render(): ReactNode {
    const { path, item, render, center, direction } = this.props;
    const { className, classes, style } = this.props;
    const root: string = classNames(classes!.root, className);
    const props = { center, path, direction, className: root };
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

export default withStyles<keyof ILayoutMixedStyles>({
  root: {},
  set: {},
  item: {}
})(Mixed);
