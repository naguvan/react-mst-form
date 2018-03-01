import * as React from 'react';
import { Component, ReactNode } from 'react';
import { findDOMNode } from 'react-dom';

import { IAppProps, IAppStates } from './types';
import { IAppStyleProps, IAppStyles } from './types';

import { WithStyles, StyledComponentProps } from 'material-ui';
import withStyles from 'material-ui/styles/withStyles';
import * as classNames from 'classnames';

import { Form, IFormConfig } from '@root/index';

import Paper from 'material-ui/Paper';

const config: IFormConfig = {
    title: 'Test Form',
    schema: {
        type: 'object',
        properties: {
            name: {
                type: 'object',
                properties: {
                    first: {
                        type: 'string',
                        title: 'First',
                        value: 'naguvan',
                        minLength: 5,
                        sequence: 1
                    },
                    middle: {
                        type: 'string',
                        title: 'Middle',
                        value: 'sk',
                        minLength: 5,
                        sequence: 1
                    },
                    last: {
                        type: 'string',
                        title: 'Last',
                        value: 'sk',
                        minLength: 5,
                        sequence: 2
                    },
                    age: {
                        type: 'number',
                        title: 'Age',
                        value: 5,
                        sequence: 2,
                        maximum: 10,
                        minimum: 3
                    }
                },
                layout: [['first', 'last'], 'middle', 'age']
            },
            title: {
                type: 'string',
                title: 'Title',
                value: 'sk',
                minLength: 5
            },
            ipv4: {
                type: 'string',
                title: 'ipv4',
                minLength: 5,
                maxLength: 20,
                format: 'ipv4'
            },
            color: {
                type: 'string',
                title: 'In which color',
                component: 'color',
                format: 'color'
            },
            size: {
                type: 'number',
                title: 'Size',
                value: 5,
                maximum: 10,
                minimum: 3,
                multipleOf: 3
            },
            type: {
                type: 'number',
                title: 'Select a type',
                enum: [1, 2],
                options: [
                    { label: 'One', value: 1 },
                    { label: 'Two', value: 2 }
                ]
            },
            agree: {
                type: 'boolean',
                title: 'I agree with your terms',
                value: false,
                const: true
            },
            array: {
                type: 'array',
                title: 'Array',
                items: {
                    type: 'object',
                    properties: {
                        name: {
                            type: 'string',
                            title: 'name',
                            minLength: 3
                        },
                        age: {
                            type: 'number',
                            title: 'age',
                            multipleOf: 2,
                            minimum: 2
                        }
                    }
                },
                minItems: 2,
                maxItems: 4
            }
        }
    },
    sections: [
        {
            title: 'Basic',
            layout: ['name', 'title', ['size', 'color']]
        },
        {
            title: 'Others',
            layout: ['ipv4', 'type', 'agree', 'array']
        }
    ]
};

export class App extends Component<IAppProps & IAppStyleProps, IAppStates> {
    constructor(props: IAppProps & IAppStyleProps, context: {}) {
        super(props, context);
        this.state = { width: 'auto', height: 'auto' };
    }

    containers: Array<HTMLDivElement> = [];

    timeout: number = -1;

    private addContainer = (container: HTMLDivElement): void => {
        if (container) {
            this.containers.push(container);
        }
    };

    componentWillUpdate() {
        this.containers.length = 0;
    }

    componentDidMount() {
        this.adjustWidthHeight();
    }

    componentDidUpdate() {
        this.adjustWidthHeight();
    }

    componentWillUnmount() {
        window.clearTimeout(this.timeout);
    }

    adjustWidthHeight(): void {
        window.clearTimeout(this.timeout);
        const { width, height } = this.state;
        if (width === 'auto' || height === 'auto') {
            this.timeout = window.setTimeout(() => this.updateWidthHeight(), 4);
        }
    }

    updateWidthHeight(): void {
        const containers = this.containers.filter(container => !!container);
        const widths = containers.map(container => container.offsetWidth);
        const heights = containers.map(container => container.offsetHeight);

        const width = `${Math.max(...widths)}px`;
        const height = `${Math.max(...heights)}px`;

        this.setState(() => ({ width, height }));
    }

    public render(): ReactNode {
        const { className, classes, style } = this.props;
        const { width, height } = this.state;
        const root: string = classNames(classes!.root, className);
        return (
            <div className={root} style={style}>
                <div
                    className={classes.container}
                    style={{ width, height }}
                    ref={this.addContainer}>
                    <h1>Form</h1>
                    <Paper square elevation={3} className={classes.paper}>
                        <Form
                            config={config}
                            onSubmit={this.onSubmit}
                            onErrors={this.onErrors}
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

    private onErrors = (errors: { [key: string]: Array<string> }) => {
        console.error(errors);
        window.alert(`errors:\n\n${JSON.stringify(errors, null, 2)}`);
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
