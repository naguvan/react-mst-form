import * as React from 'react';
import { Component, ReactNode } from 'react';

import { IAppProps, IAppStates } from './types';
import { IAppStyleProps, IAppStyles } from './types';

import { WithStyles, StyledComponentProps } from 'material-ui';
import withStyles from 'material-ui/styles/withStyles';
import * as classNames from 'classnames';

import { Form, IFormConfig } from '@root/index';

import Paper from 'material-ui/Paper';

const config: IFormConfig = {
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
    sections: [
        {
            title: 'Basic',
            layout: ['title', ['size', 'color'], 'type', 'agree']
        },
        {
            title: 'Others',
            layout: ['type', 'agree']
        }
    ] // ,
    // layout: ['title', ['size', 'color'], 'type', 'agree']
};

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
                        <Form
                            config={config}
                            onSubmit={this.onSubmit}
                            onPatch={this.onPatch}
                            onSnapshot={this.onSnapshot}
                        />
                    </Paper>
                </div>
            </div>
        );
    }

    private onSubmit = (values: { [key: string]: any }) => {
        console.info(values);
        window.alert(`submitted values:\n\n${JSON.stringify(values, null, 2)}`);
    };

    private onPatch = (patch: {
        op: 'replace' | 'add' | 'remove';
        path: string;
        value?: any;
    }): void => {
        console.info(patch);
    };

    private onSnapshot = (snapshot: {}): void => {
        console.info(snapshot);
    };
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
