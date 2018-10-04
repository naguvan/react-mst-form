import * as React from "react";
import { Component, ReactNode } from "react";

import Paper from "@material-ui/core/Paper";

import Form from "../Form";
import Theme from "../Theme";

// tslint:disable-next-line:no-empty-interface
export interface IAppProps {}

// tslint:disable-next-line:no-empty-interface
export interface IAppStates {}

export default class App extends Component<IAppProps, IAppStates> {
  public render(): ReactNode {
    return (
      <Theme theme="light">
        <Paper square={true} elevation={3}>
          <Form />
        </Paper>
      </Theme>
    );
  }
}
