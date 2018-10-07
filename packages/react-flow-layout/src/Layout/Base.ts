import { ReactNode } from "react";

import { CSSProperties } from "@material-ui/core/styles/withStyles";

export interface ILayoutBaseProps<T> {
  render: (item: T) => ReactNode;
  path: string;
  center: boolean;
  direction: "row" | "column";
  //  styles: ILayoutStyles;
  style?: CSSProperties;
  className?: string;
}
