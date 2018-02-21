import * as React from 'react';
import { Component, ReactNode } from 'react';

import { IAppProps, IAppStates } from '@root/types';
import { IAppStyleProps, IAppStyles } from '@root/types';

import withStyles from 'material-ui/styles/withStyles';
import * as classNames from 'classnames';

import FormView from './Form';
import { Form as FormModel } from '../models/form/Form';
import { renderer } from './Field';

import Paper from 'material-ui/Paper';

const form = FormModel.create({
    title: 'Test Form',
    properties: {
        title: {
            title: 'Title',
            value: 'sk',
            type: 'string',
            minLength: 5
        },
        size: {
            title: 'Size',
            value: 5,
            type: 'number',
            maximum: 10,
            minimum: 3
        },
        agree: {
            title: 'I agree with your terms',
            value: false,
            type: 'boolean'
        }
    },
    layout: ['title', 'size', ['agree'], ['title', 'size']]
});

export class App extends Component<IAppProps & IAppStyleProps, IAppStates> {
    constructor(props: IAppProps & IAppStyleProps, context: {}) {
        super(props, context);
    }

    public render(): ReactNode {
        const { className, classes, style } = this.props;
        const root: string = classNames(classes!.root, className);
        return (
            <div className={root} style={style}>
                <h1>Form</h1>
                <div>
                    <Paper square elevation={3}>
                        <FormView
                            className={classes.form}
                            form={form}
                            renderer={renderer}
                        />
                    </Paper>
                </div>
            </div>
        );
    }
}

export default withStyles<keyof IAppStyles>({
    root: { marginLeft: 300, width: 500 },
    form: {}
})(App);
