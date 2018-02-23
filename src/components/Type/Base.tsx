import * as React from 'react';
import { Component, ReactNode } from 'react';

import { ITypeProps, ITypeStates } from '@root/types';
import { IType } from '@root/types';

export default abstract class Base<
    T extends IType,
    P extends ITypeProps<T>,
    S extends ITypeStates<T>
> extends Component<P, S> {
    constructor(props: P, context: any) {
        super(props, context);
    }

    public render(): ReactNode {
        const { type } = this.props;
        const { visible, name } = type;
        return visible ? (
            <div
                key={name}
                style={{
                    width: '100%'
                }}>
                {this.renderType(type)}
            </div>
        ) : null;
    }

    protected abstract renderType(type: T): ReactNode;
}
