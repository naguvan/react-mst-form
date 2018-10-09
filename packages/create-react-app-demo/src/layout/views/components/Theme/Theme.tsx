import * as React from "react";
import { Component, ReactNode } from "react";

import { create } from "jss";

import preset from "jss-preset-default";

import JssProvider from "react-jss/lib/JssProvider";

import { Theme as ITheme } from "@material-ui/core/styles";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";

import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

import createGenerateClassName from "@material-ui/core/styles/createGenerateClassName";

import Switch from "@material-ui/core/Switch";

import CssBaseline from "@material-ui/core/CssBaseline";

export interface IThemeProps {
  theme: "dark" | "light";
}

export interface IThemeStates {
  theme: "dark" | "light";
}

// Create a JSS instance with the default preset of plugins.
// It's optional.

const jss = create(preset());

const generateClassName = createGenerateClassName();

export default class Theme extends Component<IThemeProps, IThemeStates> {
  constructor(props: IThemeProps) {
    super(props);
    this.state = { theme: props.theme };
  }

  public render(): ReactNode {
    const { children } = this.props;
    const { theme } = this.state;
    return (
      <JssProvider jss={jss} generateClassName={generateClassName}>
        <MuiThemeProvider theme={this.getTheme(theme)}>
          <CssBaseline />
          <Switch
            color="default"
            onChange={this.toggleTheme}
            checked={theme === "dark"}
          />
          {children}
        </MuiThemeProvider>
      </JssProvider>
    );
  }

  private toggleTheme = () => {
    this.setState(({ theme }) => ({
      theme: theme === "light" ? "dark" : "light"
    }));
  };

  private getTheme(theme: "dark" | "light"): ITheme {
    return createMuiTheme({
      palette: {
        type: theme
      },
      typography: {
        useNextVariants: true
      }
      // palette: {
      //   // primary: green,
      //   // accent: red,
      //   shades: theme || 'light'
      // }});
    });
  }
}
