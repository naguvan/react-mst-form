import * as React from "react";
import { Component, ReactNode } from "react";

import classNames from "classnames";

import { CSSProperties, WithStyles } from "@material-ui/core/styles/withStyles";
import withStyles from "@material-ui/core/styles/withStyles";

import Grid from "@material-ui/core/Grid";

import "tslib";

import FormCancel from "./components/Cancel";
import FormView from "./components/Form";
import FormSubmit from "./components/Submit";
import { renderer as FieldRenderer } from "./components/Type";
import FormModel from "./models/Form";

import { IFormConfig, IForm } from "./types";

import { observer } from "mobx-react";
import { onSnapshot, onPatch } from "mobx-state-tree";

export interface IFormStyles {
  root: CSSProperties;
  form: CSSProperties;
  footer: CSSProperties;
}

export interface IFormStyleProps extends WithStyles<keyof IFormStyles> {}

export interface IFormProps {
  style?: CSSProperties;
  className?: string;
  config: IFormConfig;
  onCancel?: (form?: IForm) => void;
  onSubmit: (values: { [key: string]: any }) => void;
  onErrors?: (errors: { [key: string]: Array<string> }) => void;
  onPatch?: (
    patch: {
      op: "replace" | "add" | "remove";
      path: string;
      value?: any;
    }
  ) => void;
  onSnapshot?: (snapshot: {}) => void;
}

export interface IFormStates {
  form: IForm;
}

@observer
export class Form extends Component<IFormProps & IFormStyleProps, IFormStates> {
  static getDerivedStateFromPropsFix(
    props: Readonly<IFormProps & IFormStyleProps>,
    state?: IFormStates
  ): IFormStates {
    const { config, onPatch: _onPatch, onSnapshot: _onSnapshot } = props;
    const form = FormModel.create(config);
    if (_onSnapshot) {
      onSnapshot(form, snapshot => _onSnapshot(snapshot));
    }
    if (_onPatch) {
      onPatch(form, patch => _onPatch(patch));
    }
    return { form };
  }

  constructor(props: IFormProps & IFormStyleProps) {
    super(props);
    this.state = Form.getDerivedStateFromPropsFix(props);
  }

  componentWillReceiveProps(
    nextProps: Readonly<IFormProps & IFormStyleProps>
  ): void {
    if (this.props.config !== nextProps.config) {
      this.setState(state =>
        Form.getDerivedStateFromPropsFix(nextProps, state)
      );
    }
  }

  public render(): ReactNode {
    const { form } = this.state;
    const { cancel, submit } = form;
    const { className, classes, style } = this.props;
    const { onCancel, onSubmit, onErrors } = this.props;

    const root: string = classNames(classes!.root, className, classes!.form);
    return (
      <>
        <FormView
          className={root}
          style={style}
          form={form}
          renderer={FieldRenderer}
        />
        <Grid className={classes.footer} container spacing={24}>
          {onCancel &&
            cancel && (
              <Grid item xs={6} sm={3}>
                <FormCancel label={cancel} {...{ form, onCancel }} />
              </Grid>
            )}
          <Grid item xs={6} sm={3}>
            <FormSubmit label={submit} {...{ form, onSubmit, onErrors }} />
          </Grid>
        </Grid>
      </>
    );
  }
}

export default withStyles<keyof IFormStyles, {}>({
  root: {},
  form: {
    padding: 10
  },
  footer: {
    display: "flex",
    justifyContent: "flex-end",
    padding: 10
  }
})(Form);
