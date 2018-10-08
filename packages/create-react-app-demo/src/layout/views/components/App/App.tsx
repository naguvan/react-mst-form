import * as React from "react";
import { Component, ReactNode } from "react";

import { Designer } from "react-mst-form-demo";

import Theme from "../Theme";

// tslint:disable-next-line:no-empty-interface
export interface IAppProps {}

// tslint:disable-next-line:no-empty-interface
export interface IAppStates {}

export default class App extends Component<IAppProps, IAppStates> {
  public render(): ReactNode {
    return (
      <Theme theme="light">
        <Designer />
      </Theme>
    );
  }
}
