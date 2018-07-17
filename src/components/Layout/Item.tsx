import * as React from 'react';
import { Component, ReactNode } from 'react';

import { ILayoutItemProps, ILayoutItemStates } from '../../types';
import { ILayoutItemStyleProps, ILayoutItemStyles } from '../../types';

import withStyles from '@material-ui/core/styles/withStyles';
import classNames from 'classnames';

import Flex from '../Flex';

export class Item<T> extends Component<
    ILayoutItemProps<T> & ILayoutItemStyleProps,
    ILayoutItemStates
> {
    constructor(
        props: ILayoutItemProps<T> & ILayoutItemStyleProps,
        context: {}
    ) {
        super(props, context);
    }

    public render(): ReactNode {
        const { path, center, item, render } = this.props;
        const children = render(item.value);
        const { className, classes, style } = this.props;
        const root: string = classNames(
            classes!.root,
            className,
            classes!.item
        );
        return (
            <Flex.Item
                className={root}
                key={path}
                style={{ ...item.style, ...style }}
                center={center}>
                {children}
            </Flex.Item>
        );
    }
}

export default withStyles<keyof ILayoutItemStyles>({
    root: {},
    item: {}
})(Item);
