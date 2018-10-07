import * as React from "react";
import { Component, ReactNode } from "react";

import { CSSProperties, WithStyles } from "@material-ui/core/styles/withStyles";
import withStyles from "@material-ui/core/styles/withStyles";
import classNames from "classnames";

import Flex from "../Flex";

import { ILayoutBaseProps } from "./Base";

import { ILayoutItem } from "../Model/Item";

export interface ILayoutItemStyles {
  root: CSSProperties;
  item: CSSProperties;
}

export interface ILayoutItemStyleProps
  extends WithStyles<keyof ILayoutItemStyles> {}

export interface ILayoutItemProps<T> extends ILayoutBaseProps<T> {
  item: ILayoutItem<T>;
}

// tslint:disable-next-line:no-empty-interface
export interface ILayoutItemStates {}

export class Item<T> extends Component<
  ILayoutItemProps<T> & ILayoutItemStyleProps,
  ILayoutItemStates
> {
  public render(): ReactNode {
    const { path, center, item, render } = this.props;
    const children = render(item.value);
    const { className: clazz, classes, style } = this.props;
    const className: string = classNames(classes!.root, clazz, classes!.item);
    return (
      <Flex.Item
        className={className}
        key={path}
        style={{ ...item.style, ...style }}
        center={center}
      >
        {children}
      </Flex.Item>
    );
  }
}

export default withStyles<keyof ILayoutItemStyles, {}>({
  item: {},
  root: {}
})(Item);
