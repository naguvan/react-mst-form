import * as React from 'react';
import { Component, ReactNode } from 'react';

import { IAppProps, IAppStates } from '@root/types';
import { IAppStyleProps, IAppStyles } from '@root/types';

import withStyles from 'material-ui/styles/withStyles';
import * as classNames from 'classnames';

import FormView from './Form';
import { Form as FormModel } from '../models/form/Form';

const form = FormModel.create({
    title: 'Test Form',
    properties: {
        name: {
            title: 'Name',
            value: 'sk',
            type: 'string',
            minLength: 5
        },
        age: {
            title: 'Age',
            value: 1,
            type: 'number',
            maximum: 10,
            minimum: 0
        },
        boy: {
            title: 'Boy?',
            value: true,
            type: 'boolean'
        }
    },
    layout: ['name', 'age', ['boy']]
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
                <h1>App Form </h1>
                <FormView className={classes.form} form={form} />
            </div>
        );
    }
}

export default withStyles<keyof IAppStyles>({
    root: {},
    form: {}
})(App);
