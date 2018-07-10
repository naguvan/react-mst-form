import * as React from 'react';
import { Component, ReactNode, Fragment } from 'react';

import { IObjectProps, IObjectStates } from '@root/types';
import { IObject, IForm, IFormLayout } from '@root/types';

import { observer } from 'mobx-react';

import Base from './Base';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

import { renderer } from './renderer';
import Layout from '../Layout';

@observer
export default class NObject extends Base<
    IObject,
    IObjectProps,
    IObjectStates
> {
    constructor(props: IObjectProps, context: any) {
        super(props, context);
    }

    protected renderType(type: IObject, form: IForm): ReactNode {
        const { layout } = this.props;
        return (
            <>
                <Layout
                    center
                    items={layout.length > 0 ? layout : this.layout(type)}
                    render={this.getFieldRenderer() as any}
                />
                {!type.valid &&
                    type.errors!.length > 0 && (
                        <FormHelperText error>
                            {type.errors!.join(', ')}
                        </FormHelperText>
                    )}
            </>
        );
    }

    protected getFieldRenderer(): (item: string) => ReactNode {
        const { type, form } = this.props;
        return item => renderer(type.getProperty(item)!, form);
    }

    protected layout(type: IObject): IFormLayout {
        const properties = type.getProperties();
        const sequences = properties.map((property, index) => {
            const sequence = type.getProperty(property)!.sequence;
            return {
                property,
                sequence:
                    sequence !== null && sequence !== undefined
                        ? sequence
                        : index
            };
        });
        sequences.sort(
            (left, right) =>
                left.sequence === right.sequence
                    ? 0
                    : left.sequence > right.sequence ? 1 : -1
        );
        const mappings = new Map<number, Array<string>>();
        for (const { property, sequence } of sequences) {
            let layout = mappings.get(sequence);
            if (!layout) {
                mappings.set(sequence, (layout = []));
            }
            layout.push(property);
        }
        const layout: IFormLayout = [];
        for (const [sequence, values] of mappings.entries()) {
            if (values.length === 1) {
                layout.push(values[0]);
            } else {
                layout.push(values);
            }
        }
        return layout;
    }
}
