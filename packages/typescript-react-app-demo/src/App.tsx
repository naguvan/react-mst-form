import * as React from "react";
import { Component, ReactNode } from "react";

import { CSSProperties, WithStyles } from "@material-ui/core/styles/withStyles";
import withStyles from "@material-ui/core/styles/withStyles";
import classNames from "classnames";

import { Designer } from "react-mst-form-demo";

import Theme from "./Theme";

export interface IAppStyles {
  root: CSSProperties;
}

export interface IAppStyleProps extends WithStyles<keyof IAppStyles> {}

export interface IAppProps {
  style?: CSSProperties;
  className?: string;
}

// tslint:disable-next-line:no-empty-interface
export interface IAppStates {}

export class App extends Component<IAppProps & IAppStyleProps, IAppStates> {
  public render(): ReactNode {
    const { className: clazz, classes, style } = this.props;
    const className: string = classNames(classes!.root, clazz);
    return (
      <Theme theme="light">
        <div {...{ className, style }}>
          <Designer />
        </div>
      </Theme>
    );
  }
}

export default withStyles<keyof IAppStyles, {}>({
  root: {
    display: "flex",
    justifyContent: "center",
    margin: 20
  }
})(App);
