import { Component, ReactNode } from "react";

import { CSSProperties } from "@material-ui/core/styles/withStyles";

import { IRenderer } from "../Type/Renderer";

import FormModel, { IForm, IFormConfig } from "../../models/Form";

import { onPatch, onSnapshot } from "mobx-state-tree";
import { IFieldErrors } from "reactive-json-schema";

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

export default abstract class Form<
  P extends IFormProps,
  S extends IFormStates
> extends Component<P, S> {
  private static getDerivedStateFromPropsFix<
    P extends IFormProps,
    S extends IFormStates
  >(props: Readonly<P>, state?: IFormStates): S {
    const { config, onPatch: xonPatch, onSnapshot: xonSnapshot } = props;
    const form = FormModel.create(config);
    if (xonSnapshot) {
      onSnapshot(form, snapshot => xonSnapshot(snapshot));
    }
    if (xonPatch) {
      onPatch(form, patch => xonPatch(patch));
    }
    return { form } as S;
  }

  constructor(props: P) {
    super(props);
    this.state = Form.getDerivedStateFromPropsFix<P, S>(props);
  }

  public componentWillReceiveProps(nextProps: Readonly<P>): void {
    if (this.props.config !== nextProps.config) {
      this.setState(state =>
        Form.getDerivedStateFromPropsFix(nextProps, state)
      );
    }
  }

  public abstract render(): ReactNode;
}
