import * as React from 'react';
import { Component, ReactNode } from 'react';

import { IAppProps, IAppStates } from '@root/types';
import { IAppStyleProps, IAppStyles } from '@root/types';

import withStyles from 'material-ui/styles/withStyles';
import * as classNames from 'classnames';

import FormView from './Form';
import { Form as FormModel } from '../models/Form/Form';
import { renderer } from './Field';

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
    layout: ['title', ['size', 'color'], 'type', 'agree', ['title', 'size']]
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
                <div>
                    <h1>Form</h1>
                    <Paper square elevation={3} className={classes.paper}>
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
    root: {
        display: 'flex',
        justifyContent: 'center',
        // flexDirection: 'column',
        margin: 20
    },
    paper: {
        backgroundColor: '#eeeeee'
    },
    form: { padding: 10 }
})(App);
