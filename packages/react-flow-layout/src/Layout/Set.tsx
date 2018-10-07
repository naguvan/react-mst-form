import * as React from "react";
import { Component, ReactNode } from "react";

import { CSSProperties, WithStyles } from "@material-ui/core/styles/withStyles";
import withStyles from "@material-ui/core/styles/withStyles";
import classNames from "classnames";

import Flex from "../Flex";
import Mixed from "./Mixed";

import { ILayoutBaseProps } from "./Base";

import { ILayoutSet } from "../Model/Set";

export interface ILayoutSetStyles {
  root: CSSProperties;
  set: CSSProperties;
  item: CSSProperties;
}

export interface ILayoutSetStyleProps
  extends WithStyles<keyof ILayoutSetStyles> {}

export interface ILayoutSetProps<T> extends ILayoutBaseProps<T> {
  items: ILayoutSet<T>;
}

// tslint:disable-next-line:no-empty-interface
export interface ILayoutSetStates {}

export class Set<T> extends Component<
  ILayoutSetProps<T> & ILayoutSetStyleProps,
  ILayoutSetStates
> {
  public render(): ReactNode {
    const { path, items, direction, center, render } = this.props;
    const { className: clazz, classes, style } = this.props;
    const className: string = classNames(classes.root, clazz, classes.set);
    return (
      <Flex.Set
        className={className}
        key={path}
        direction={direction}
        style={{ ...items.style, ...style }}
      >
        {items.items.map((item, index) => (
          <Mixed
            center={center}
            classes={{ set: classes.set, item: classes.item }}
            render={render as any}
            item={item}
            direction={direction === "column" ? "row" : "column"}
            path={`${path}/${index}`}
            key={`${path}/${index}`}
          />
        ))}
      </Flex.Set>
    );
  }
}

export default withStyles<keyof ILayoutSetStyles, {}>({
  item: {},
  root: {},
  set: {}
})(Set);
