import { CSSProperties, WithStyles } from "@material-ui/core/styles/withStyles";

export interface IFlexItemStyles {
  root: CSSProperties;
  center: CSSProperties;
}

export interface IFlexItemStyleProps
  extends WithStyles<keyof IFlexItemStyles> {}

export interface IFlexItemProps {
  center?: boolean;
  fluid?: boolean;
  style?: CSSProperties;
  className?: string;
}

export interface IFlexItemStates {}

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
