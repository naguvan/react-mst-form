import { Component, ReactNode } from "react";

import FormModel, { IForm, IFormConfig } from "../../models/Form";

import { onPatch, onSnapshot } from "mobx-state-tree";

import {
  ITypeConfig,
  ITypeMetaProps,
  metafy,
  valuefy
} from "reactive-json-schema";

import { deepmerge } from "../../utils";

export type ISchemaConfig = ITypeConfig;

export type IMetaConfig = ITypeMetaProps;

export interface IFormProps {
  schema?: ISchemaConfig;
  meta?: IMetaConfig;
  config: IFormConfig;
  snapshot?: {};
  onPatch?: (
    patch: {
      op: "replace" | "add" | "remove";
      path: string;
      value?: any;
    }
  ) => void;
  onSnapshot?: (snapshot: {}) => void;
}

export interface IFormRenderProps {
  children: (form: IForm) => ReactNode;
}

export interface IFormStates {
  form: IForm;
}

export default class Form extends Component<
  IFormProps & IFormRenderProps,
  IFormStates
> {
  private static getDerivedStateFromPropsFix(
    props: Readonly<IFormProps & IFormRenderProps>,
    state?: IFormStates
  ): IFormStates {
    const { schema: pschema, meta, snapshot } = props;
    const { config, onPatch: xonPatch, onSnapshot: xonSnapshot } = props;
    let schema = deepmerge<ISchemaConfig, ISchemaConfig>(
      { ...config.schema! },
      { ...pschema! }
    );
    if (meta) {
      schema = metafy(schema, meta);
    }
    if (snapshot) {
      schema = valuefy(schema, snapshot);
    }
    const form = FormModel.create({ ...config, schema });
    if (xonSnapshot) {
      onSnapshot(form, xonSnapshot);
    }
    if (xonPatch) {
      onPatch(form, xonPatch);
    }
    return { form };
  }

  constructor(props: IFormProps & IFormRenderProps) {
    super(props);
    this.state = Form.getDerivedStateFromPropsFix(props);
  }

  public componentWillReceiveProps(
    nextProps: Readonly<IFormProps & IFormRenderProps>
  ): void {
    if (this.props.config !== nextProps.config) {
      this.setState(state =>
        Form.getDerivedStateFromPropsFix(nextProps, state)
      );
    }
  }

  public render(): ReactNode {
    const { children } = this.props;
    const { form } = this.state;
    return children(form);
  }
}
