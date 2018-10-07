import { CSSProperties } from "@material-ui/core/styles/withStyles";

export interface ILayoutItem<T> {
  value: T;
  style: CSSProperties;
}

export class LayoutItem<T> implements ILayoutItem<T> {
  public static from<T>(item: T): ILayoutItem<T> {
    return new LayoutItem(item);
  }

  public static styled<T>(style: CSSProperties, item: T): ILayoutItem<T> {
    return new LayoutItem(item, style);
  }

  constructor(public value: T, public style: CSSProperties = {}) {}
}
