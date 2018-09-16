import { ReactNode } from "react";
import { CSSProperties, WithStyles } from "@material-ui/core/styles/withStyles";

export interface ILayoutItem<T> {
  value: T;
  style: CSSProperties;
}

export interface ILayoutSet<T> {
  items: Array<ILayoutSet<T> | ILayoutItem<T>>;
  style: CSSProperties;
}

export interface ILayoutBaseProps<T> {
  render: (item: T) => ReactNode;
  path: string;
  center: boolean;
  direction: "row" | "column";
  //  styles: ILayoutStyles;
  style?: CSSProperties;
  className?: string;
}

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
  items: ILayoutSet<T> | Array<T | Array<T>>;
  style?: CSSProperties;
  className?: string;
}

export interface ILayoutStates {}

export interface ILayoutItemStyles {
  root: CSSProperties;
  item: CSSProperties;
}

export interface ILayoutItemStyleProps
  extends WithStyles<keyof ILayoutItemStyles> {}

export interface ILayoutItemProps<T> extends ILayoutBaseProps<T> {
  item: ILayoutItem<T>;
}

export interface ILayoutItemStates {}

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

export interface ILayoutSetStates {}

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

export interface ILayoutMixedStates {}
