import { CSSProperties } from "@material-ui/core/styles/withStyles";

import { ILayoutItem, ILayoutSet } from "./Common";

export class Item<T> implements ILayoutItem<T> {
  public static from<T>(item: T): ILayoutItem<T> {
    return new Item(item);
  }

  public static styled<T>(style: CSSProperties, item: T): ILayoutItem<T> {
    return new Item(item, style);
  }

  constructor(public value: T, public style: CSSProperties = {}) {}
}

// tslint:disable-next-line:max-classes-per-file
export class Set<T> implements ILayoutSet<T> {
  public static from<T>(
    ...items: Array<ILayoutSet<T> | ILayoutItem<T>>
  ): ILayoutSet<T> {
    return new Set(items);
  }

  public static styled<T>(
    style: CSSProperties,
    ...items: Array<ILayoutSet<T> | ILayoutItem<T>>
  ): ILayoutSet<T> {
    return new Set(items, style);
  }

  constructor(
    public items: Array<ILayoutSet<T> | ILayoutItem<T>>,
    public style: CSSProperties = {}
  ) {}
}

export function arrange<T>(items: Array<T | T[]>): ILayoutSet<T> {
  const container = Set.from(
    ...items.map((item: any) => {
      return Array.isArray(item) ? arrange(item) : Item.from(item);
    })
  );
  return container as ILayoutSet<T>;
}
