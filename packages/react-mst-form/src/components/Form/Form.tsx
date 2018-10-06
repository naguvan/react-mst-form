import * as React from "react";
import { Component, ReactNode } from "react";

import classNames from "classnames";

import { CSSProperties, WithStyles } from "@material-ui/core/styles/withStyles";
import withStyles from "@material-ui/core/styles/withStyles";

import FormContent from "../Content";
import FormFooter from "../Footer";
import Renderer, { IRenderer } from "../Type/Renderer";

import FormModel, { IFormConfig, IForm } from "../../models/Form";

import { observer } from "mobx-react";
import { onSnapshot, onPatch } from "mobx-state-tree";

export interface IFormStyles {
  root: CSSProperties;
  content: CSSProperties;
  footer: CSSProperties;
}

export interface IFormStyleProps extends WithStyles<keyof IFormStyles> {}

export interface IFormProps {
  style?: CSSProperties;
  className?: string;
  config: IFormConfig;
  renderer?: IRenderer;
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
    const { className: clazz, classes, style } = this.props;
    const {
      onCancel,
      onSubmit,
      onErrors,
      renderer = new Renderer()
    } = this.props;

    const className: string = classNames(classes!.root, clazz);
    return (
      <div {...{ className, style }}>
        <FormContent {...{ className: classes.content, form, renderer }} />
        <FormFooter
          {...{ className: classes.footer, form, onCancel, onSubmit, onErrors }}
        />
      </div>
    );
  }
}

export default withStyles<keyof IFormStyles, {}>({
  root: {
    padding: 10
  },
  content: {
    padding: 10
  },
  footer: {
    padding: 10
  }
})(Form);
