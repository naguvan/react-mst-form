import * as React from 'react';
import { Component, ReactNode } from 'react';

import { create } from 'jss';
import preset from 'jss-preset-default';
import JssProvider from 'react-jss/lib/JssProvider';

import App from './App';
import { Theme } from 'material-ui/styles';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import createMuiTheme from 'material-ui/styles/createMuiTheme';
import createGenerateClassName from 'material-ui/styles/createGenerateClassName';

import Reboot from 'material-ui/Reboot';

export interface IBootstrapProps {
    theme: 'dark' | 'brown' | 'light';
}

export interface IBootstrapStates {}

// Create a JSS instance with the default preset of plugins.
// It's optional.

const jss = create(preset());

const generateClassName = createGenerateClassName();

export default class Bootstrap extends Component<
    IBootstrapProps,
    IBootstrapStates
> {
    public render(): ReactNode {
        const { theme } = this.props;
        return (
            <JssProvider jss={jss} generateClassName={generateClassName}>
                <MuiThemeProvider theme={this.getTheme(theme)}>
                    <Reboot>{}</Reboot>
                    <App />
                </MuiThemeProvider>
            </JssProvider>
        );
    }

    private getTheme(theme: 'dark' | 'brown' | 'light'): Theme {
        return createMuiTheme({
            // palette: {
            //   // primary: green,
            //   // accent: red,
            //   shades: theme || "light"
            // }
        });
    }
}
