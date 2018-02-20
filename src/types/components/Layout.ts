import { ReactNode } from 'react';

export interface ILayoutStyles {
    set?: React.CSSProperties;
    item?: React.CSSProperties;
}

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
    direction: 'row' | 'column';
    styles: ILayoutStyles;
}

export interface ILayoutProps<T> {
    path?: string;
    center?: boolean;
    direction?: 'row' | 'column';
    styles?: ILayoutStyles;
    render: (item: T) => ReactNode;
    items: ILayoutSet<T> | Array<T | Array<T>>;
}

export interface ILayoutStates {}

export interface ILayoutItemProps<T> extends ILayoutBaseProps<T> {
    item: ILayoutItem<T>;
}

export interface ILayoutItemStates {}

export interface ILayoutSetProps<T> extends ILayoutBaseProps<T> {
    items: ILayoutSet<T>;
}

export interface ILayoutSetStates {}

export interface ILayoutMixedProps<T> extends ILayoutBaseProps<T> {
    item: ILayoutItem<T> | ILayoutSet<T>;
}

export interface ILayoutMixedStates {}
