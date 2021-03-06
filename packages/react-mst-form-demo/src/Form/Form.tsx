// tslint:disable:object-literal-sort-keys

// tslint:disable:no-console

import * as React from "react";
import { Component, ReactNode } from "react";

import { CSSProperties, WithStyles } from "@material-ui/core/styles/withStyles";

import withStyles from "@material-ui/core/styles/withStyles";
import classNames from "classnames";

import {
  FormDialog,
  FormInline,
  IFormConfig,
  IMetaConfig,
  ISchemaConfig
} from "react-mst-form";

import Iconer from "../Iconer";

export interface IFormStyles {
  root: CSSProperties;
  dialog: CSSProperties;
}

export interface IFormStyleProps extends WithStyles<keyof IFormStyles> {}

export interface IFormProps {
  style?: CSSProperties;
  className?: string;
  meta?: IMetaConfig;
  schema?: ISchemaConfig;
  config: IFormConfig;
  snapshot?: {};
  open?: boolean;
  onClose?: () => void;
}

// tslint:disable-next-line:no-empty-interface
export interface IFormStates {}

export class Form extends Component<IFormProps & IFormStyleProps, IFormStates> {
  public render(): ReactNode {
    const { className, classes, style } = this.props;
    const root: string = classNames(classes!.root, className);
    const { config, open, onClose } = this.props;
    const { schema, meta, snapshot } = this.props;
    const iconer = new Iconer();

    const props = { config, schema, meta, iconer, snapshot };
    const { onCancel, onSubmit, onErrors, onPatch, onSnapshot } = this;
    const events = { onCancel, onSubmit, onErrors, onPatch, onSnapshot };

    return (
      <div className={root} style={style}>
        <FormInline {...props} {...events} />
        {open && (
          <FormDialog
            {...props}
            {...events}
            classes={{ paper: classes.dialog }}
            open={open}
            onClose={onClose}
            onCancel={onClose}
          />
        )}
      </div>
    );
  }

  private onCancel = () => {
    window.alert(`form cancelled`);
  };

  private onSubmit = (values: { [key: string]: any }) => {
    console.info(values);
    window.alert(`submitted values:\n\n${JSON.stringify(values, null, 2)}`);
  };

  private onErrors = (errors: any) => {
    console.error(errors);
    window.alert(`errors:\n\n${JSON.stringify(errors, null, 2)}`);
  };

  private onPatch = (patch: {
    op: "replace" | "add" | "remove";
    path: string;
    value?: any;
  }): void => {
    console.info(patch);
  };

  private onSnapshot = (snapshot: {}): void => {
    console.info(snapshot);
  };
}

export default withStyles<keyof IFormStyles, {}>({
  dialog: {
    width: 500,
    height: 460
  },
  root: {
    margin: "0 auto",
    height: 460
  }
})(Form);
