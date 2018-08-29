import * as React from "react";
import { Component, ReactNode } from "react";

import { create } from "jss";
import preset from "jss-preset-default";
import JssProvider from "react-jss/lib/JssProvider";

import App from "./App";
import { Theme } from "@material-ui/core/styles";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import createGenerateClassName from "@material-ui/core/styles/createGenerateClassName";

import CssBaseline from "@material-ui/core/CssBaseline";

import { IBootProps, IBootStates } from "./types";

// Create a JSS instance with the default preset of plugins.
// It's optional.

const jss = create(preset());

const generateClassName = createGenerateClassName();

export default class Boot extends Component<IBootProps, IBootStates> {
  constructor(props: IBootProps, context: {}) {
    super(props, context);
  }

  public render(): ReactNode {
    const { theme } = this.props;
    return (
      <JssProvider jss={jss} generateClassName={generateClassName}>
        <MuiThemeProvider theme={this.getTheme(theme)}>
          <CssBaseline />
          <App />
        </MuiThemeProvider>
      </JssProvider>
    );
  }

  private getTheme(theme: "dark" | "brown" | "light"): Theme {
    return createMuiTheme({
      // palette: {
      //   // primary: green,
      //   // accent: red,
      //   shades: theme || "light"
      // }});
    });
  }
}
