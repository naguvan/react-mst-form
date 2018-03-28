import * as React from 'react';
import { Component, ReactNode } from 'react';

import { ILayoutSetProps, ILayoutSetStates } from '@root/types';
import { ILayoutSetStyleProps, ILayoutSetStyles } from '@root/types';

import { WithStyles, StyledComponentProps } from 'material-ui';
import withStyles from 'material-ui/styles/withStyles';
import classNames from 'classnames';

import Flex from '../Flex';
import Mixed from './Mixed';

export class Set<T> extends Component<
    ILayoutSetProps<T> & ILayoutSetStyleProps,
    ILayoutSetStates
> {
    constructor(props: ILayoutSetProps<T> & ILayoutSetStyleProps, context: {}) {
        super(props, context);
    }

    public render(): ReactNode {
        const { path, items, direction, center, render } = this.props;
        const { className, classes, style } = this.props;
        const root: string = classNames(classes.root, className, classes.set);
        return (
            <Flex.Set
                className={root}
                key={path}
                direction={direction}
                style={{ ...items.style, ...style }}>
                {items.items.map((item, index) => (
                    <Mixed
                        center={center}
                        classes={{ set: classes.set, item: classes.item }}
                        render={render as any}
                        item={item}
                        direction={direction === 'column' ? 'row' : 'column'}
                        path={`${path}/${index}`}
                        key={`${path}/${index}`}
                    />
                ))}
            </Flex.Set>
        );
    }
}

export default withStyles<keyof ILayoutSetStyles>({
    root: {},
    set: {},
    item: {}
})(Set);
