import * as React from 'react';
import { Component, ReactNode } from 'react';

import { IFieldProps, IFieldStates } from '@root/types';
import { IField } from '@root/types';

export default abstract class Base<
    F extends IField,
    P extends IFieldProps<F>,
    S extends IFieldStates<F>
> extends Component<P, S> {
    constructor(props: P, context: any) {
        super(props, context);
    }

    public render(): ReactNode {
        const { field } = this.props;
        const { visible, name } = field;
        return visible ? (
            <div
                key={name}
                style={{
                    width: '100%'
                }}>
                {this.renderField(field)}
            </div>
        ) : null;
    }

    protected abstract renderField(field: F): ReactNode;
}
