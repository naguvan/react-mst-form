import * as React from 'react';
import { Component, ReactNode } from 'react';

import { IAppProps, IAppStates } from './types';
import { IAppStyleProps, IAppStyles } from './types';

import withStyles from 'material-ui/styles/withStyles';
import * as classNames from 'classnames';

import { FormView, FormModel, FormSubmit, FieldRenderer } from '@root/index';

import Paper from 'material-ui/Paper';

import { onSnapshot, onPatch } from 'mobx-state-tree';

const form = FormModel.create({
    title: 'Test Form',
    properties: {
        title: {
            type: 'string',
            title: 'Title',
            value: 'sk',
            minLength: 5
        },
        color: {
            type: 'color',
            title: 'In which color'
        },
        size: {
            type: 'number',
            title: 'Size',
            value: 5,
            maximum: 10,
            minimum: 3
        },
        type: {
            type: 'enum',
            title: 'Select a type',
            options: [
                { label: 'One', value: '1' },
                { label: 'Two', value: '2' }
            ]
        },
        agree: {
            type: 'boolean',
            title: 'I agree with your terms',
            value: false
        }
    },
    layout: ['title', ['size', 'color'], 'type', 'agree']
});

onSnapshot(form, snapshot => console.info(snapshot));

onPatch(form, patch => console.info(patch));

export class App extends Component<IAppProps & IAppStyleProps, IAppStates> {
    constructor(props: IAppProps & IAppStyleProps, context: {}) {
        super(props, context);
    }

    public render(): ReactNode {
        const { className, classes, style } = this.props;
        const root: string = classNames(classes!.root, className);
        return (
            <div className={root} style={style}>
                <div className={classes.container}>
                    <h1>Form</h1>
                    <Paper square elevation={3} className={classes.paper}>
                        <FormView
                            className={classes.form}
                            form={form}
                            renderer={FieldRenderer}
                        />
                        <div className={classes.submit}>
                            <FormSubmit
                                form={form}
                                onSubmit={
                                    // tslint:disable-next-line:jsx-no-lambda
                                    values => console.info(values)
                                }
                            />
                        </div>
                    </Paper>
                </div>
            </div>
        );
    }
}

export default withStyles<keyof IAppStyles>({
    root: {
        display: 'flex',
        justifyContent: 'center',
        margin: 20
    },
    container: {
        minWidth: 400
    },
    paper: {
        backgroundColor: '#eeeeee'
    },
    form: {
        padding: 10
    },
    submit: {
        display: 'flex',
        justifyContent: 'flex-end',
        padding: 10
    }
})(App);
