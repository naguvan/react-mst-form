import * as React from "react";
import { Component, ReactNode } from "react";

import classNames from "classnames";

import { CSSProperties, WithStyles } from "@material-ui/core/styles/withStyles";
import withStyles from "@material-ui/core/styles/withStyles";

import FormContent from "../Content";
import FormFooter from "../Footer";
import Renderer, { IRenderer } from "../Type/Renderer";

import FormModel, { IForm, IFormConfig } from "../../models/Form";

import { observer } from "mobx-react";
import { onPatch, onSnapshot } from "mobx-state-tree";

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
  onErrors?: (errors: { [key: string]: string[] }) => void;
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
  private static getDerivedStateFromPropsFix(
    props: Readonly<IFormProps & IFormStyleProps>,
    state?: IFormStates
  ): IFormStates {
    const { config, onPatch: xonPatch, onSnapshot: xonSnapshot } = props;
    const form = FormModel.create(config);
    if (xonSnapshot) {
      onSnapshot(form, snapshot => xonSnapshot(snapshot));
    }
    if (xonPatch) {
      onPatch(form, patch => xonPatch(patch));
    }
    return { form };
  }

  constructor(props: IFormProps & IFormStyleProps) {
    super(props);
    this.state = Form.getDerivedStateFromPropsFix(props);
  }

  public componentWillReceiveProps(
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
  content: {
    padding: 10
  },
  footer: {
    padding: 10
  },
  root: {
    padding: 10
  }
})(Form);
