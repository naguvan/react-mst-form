import * as React from 'react';
import { ILayoutSet, ILayoutItem } from '@root/types';

export class Item<T> implements ILayoutItem<T> {
    constructor(public value: T, public style: React.CSSProperties = {}) {}

    static from<T>(item: T): ILayoutItem<T> {
        return new Item(item);
    }

    static styled<T>(style: React.CSSProperties, item: T): ILayoutItem<T> {
        return new Item(item, style);
    }
}

export class Set<T> implements ILayoutSet<T> {
    constructor(
        public items: Array<ILayoutSet<T> | ILayoutItem<T>>,
        public style: React.CSSProperties = {}
    ) {}

    static from<T>(
        ...items: Array<ILayoutSet<T> | ILayoutItem<T>>
    ): ILayoutSet<T> {
        return new Set(items);
    }

    static styled<T>(
        style: React.CSSProperties,
        ...items: Array<ILayoutSet<T> | ILayoutItem<T>>
    ): ILayoutSet<T> {
        return new Set(items, style);
    }
}

export function arrange<T>(items: Array<T | Array<T>>): ILayoutSet<T> {
    const container = Set.from(
        ...items.map(item => {
            return Array.isArray(item) ? arrange(item) : Item.from(item);
        })
    );
    return container;
}
