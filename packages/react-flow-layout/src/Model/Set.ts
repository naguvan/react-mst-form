import { CSSProperties } from "@material-ui/core/styles/withStyles";

import { ILayoutItem, LayoutItem } from "./Item";

export interface ILayoutSet<T> {
  items: Array<ILayoutSet<T> | ILayoutItem<T>>;
  style: CSSProperties;
}

export class LayoutSet<T> implements ILayoutSet<T> {
  public static from<T>(
    ...items: Array<ILayoutSet<T> | ILayoutItem<T>>
  ): ILayoutSet<T> {
    return new LayoutSet(items);
  }

  public static styled<T>(
    style: CSSProperties,
    ...items: Array<ILayoutSet<T> | ILayoutItem<T>>
  ): ILayoutSet<T> {
    return new LayoutSet(items, style);
  }

  public static create<T>(items: Array<T | T[]>): ILayoutSet<T> {
    return LayoutSet.from<T>(
      ...items.map((item: any) => {
        return Array.isArray(item)
          ? LayoutSet.create(item)
          : LayoutItem.from(item);
      })
    );
  }

  constructor(
    public items: Array<ILayoutSet<T> | ILayoutItem<T>>,
    public style: CSSProperties = {}
  ) {}
}
