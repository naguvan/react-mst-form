import * as React from "react";
import { Component, ReactNode } from "react";

import classNames from "classnames";

import { CSSProperties, WithStyles } from "@material-ui/core/styles/withStyles";
import withStyles from "@material-ui/core/styles/withStyles";

import FormContent from "../Content";
import FormFooter from "../Footer";
import FormHeader from "../Header";
import Renderer, { IRenderer } from "../Type/Renderer";

import FormModel, { IForm, IFormConfig } from "../../models/Form";

import { observer } from "mobx-react";
import { onPatch, onSnapshot } from "mobx-state-tree";
import { IFieldErrors } from "reactive-json-schema";

export interface IFormStyles {
  root: CSSProperties;
  header: CSSProperties;
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
  onErrors?: (errors: IFieldErrors) => void;
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
        <FormHeader {...{ className: classes.header, form }} />
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
    order: 3,
    overflowY: "auto",
    padding: 10
  },
  footer: {
    flexBasis: 80,
    flexShrink: 0,
    order: 3,
    padding: 10
  },
  header: {
    flexBasis: 48,
    flexShrink: 0,
    order: 1
  },
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    margin: 0,
    minHeight: "100%",
    padding: 10
  }
})(Form);
