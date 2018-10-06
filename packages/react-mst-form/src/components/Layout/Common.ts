import { ReactNode } from "react";

import { CSSProperties } from "@material-ui/core/styles/withStyles";

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
