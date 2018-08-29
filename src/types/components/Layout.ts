import { ReactNode } from "react";

import { WithStyles } from "@material-ui/core";

export interface ILayoutItem<T> {
  value: T;
  style: React.CSSProperties;
}

export interface ILayoutSet<T> {
  items: Array<ILayoutSet<T> | ILayoutItem<T>>;
  style: React.CSSProperties;
}

export interface ILayoutBaseProps<T> {
  render: (item: T) => ReactNode;
  path: string;
  center: boolean;
  direction: "row" | "column";
  //  styles: ILayoutStyles;
  style?: React.CSSProperties;
  className?: string;
}

export interface ILayoutStyles {
  root: React.CSSProperties;
  set: React.CSSProperties;
  item: React.CSSProperties;
}

export interface ILayoutStyleProps extends WithStyles<keyof ILayoutStyles> {}

export interface ILayoutProps<T> {
  path?: string;
  center?: boolean;
  direction?: "row" | "column";
  // styles?: ILayoutStyles;
  render: (item: T) => ReactNode;
  items: ILayoutSet<T> | Array<T | Array<T>>;
  style?: React.CSSProperties;
  className?: string;
}

export interface ILayoutStates {}

export interface ILayoutItemStyles {
  root: React.CSSProperties;
  item: React.CSSProperties;
}

export interface ILayoutItemStyleProps
  extends WithStyles<keyof ILayoutItemStyles> {}

export interface ILayoutItemProps<T> extends ILayoutBaseProps<T> {
  item: ILayoutItem<T>;
}

export interface ILayoutItemStates {}

export interface ILayoutSetStyles {
  root: React.CSSProperties;
  set: React.CSSProperties;
  item: React.CSSProperties;
}

export interface ILayoutSetStyleProps
  extends WithStyles<keyof ILayoutSetStyles> {}

export interface ILayoutSetProps<T> extends ILayoutBaseProps<T> {
  items: ILayoutSet<T>;
}

export interface ILayoutSetStates {}

export interface ILayoutMixedStyles {
  root: React.CSSProperties;
  set: React.CSSProperties;
  item: React.CSSProperties;
}

export interface ILayoutMixedStyleProps
  extends WithStyles<keyof ILayoutMixedStyles> {}

export interface ILayoutMixedProps<T> extends ILayoutBaseProps<T> {
  item: ILayoutItem<T> | ILayoutSet<T>;
}

export interface ILayoutMixedStates {}
