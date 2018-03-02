import * as React from 'react';
import { Component, ReactNode } from 'react';
import { findDOMNode } from 'react-dom';

import { ISchemaProps, ISchemaStates } from './types';
import { ISchemaStyleProps, ISchemaStyles } from './types';

import { WithStyles, StyledComponentProps } from 'material-ui';
import withStyles from 'material-ui/styles/withStyles';
import * as classNames from 'classnames';

import { Form, IFormConfig } from '@root/index';
import Flex from '@root/components/Flex';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

export class Schema extends Component<
    ISchemaProps & ISchemaStyleProps,
    ISchemaStates
> {
    constructor(props: ISchemaProps & ISchemaStyleProps, context: {}) {
        super(props, context);
        this.state = Schema.getState(props);
    }

    static getState(props: ISchemaProps & ISchemaStyleProps): ISchemaStates {
        const { config } = props;
        return { config: JSON.stringify(config, null, 2) };
    }

    componentWillReceiveProps(
        nextProps: Readonly<ISchemaProps & ISchemaStyleProps>,
        nextContext: any
    ): void {
        this.setState(() => Schema.getState(nextProps));
    }

    public render(): ReactNode {
        const { className, classes, style } = this.props;
        const { config } = this.state;
        return (
            <>
                <h1>Schema</h1>
                <Paper square elevation={3} className={classes.paper}>
                    <TextField
                        multiline
                        fullWidth
                        rows={25}
                        value={config}
                        onChange={this.onChange}
                    />
                </Paper>
                <Button
                    variant={'raised'}
                    color={'primary'}
                    disabled={!this.isJSON(config)}
                    onClick={this.onSubmit}>
                    Render
                </Button>
            </>
        );
    }

    private isJSON(config: string): boolean {
        try {
            return JSON.parse(config);
        } catch {
            return false;
        }
    }

    private onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const config = event.currentTarget.value;
        this.setState(() => ({ config }));
    };

    private onSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
        const { config } = this.state;
        const { onConfig } = this.props;
        if (onConfig) {
            onConfig(JSON.parse(config));
        }
    };
}

export default withStyles<keyof ISchemaStyles>({
    paper: {
        backgroundColor: '#eeeeee'
    }
})(Schema);
