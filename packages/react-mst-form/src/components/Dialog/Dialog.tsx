import * as React from "react";
import { Component, ReactNode } from "react";

import classNames from "classnames";

import { CSSProperties, WithStyles } from "@material-ui/core/styles/withStyles";
import withStyles from "@material-ui/core/styles/withStyles";

import Dialog, { DialogClassKey, DialogProps } from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import FormContent from "../Content";
import FormFooter from "../Footer";
import FormHeader from "../Header";
import Renderer, { IRenderer } from "../Type/Renderer";

import FormModel, { IForm, IFormConfig } from "../../models/Form";

import { observer } from "mobx-react";
import { onPatch, onSnapshot } from "mobx-state-tree";

export interface IFormDialogStyles {
  root: CSSProperties;
  header: CSSProperties;
  content: CSSProperties;
  footer: CSSProperties;
  title: CSSProperties;
}

export type IFormDialogClassKey = keyof IFormDialogStyles | DialogClassKey;

export interface IFormDialogStyleProps
  extends WithStyles<IFormDialogClassKey> {}

export interface IFormDialogProps extends DialogProps {
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

export interface IFormDialogStates {
  form: IForm;
}

@observer
export class FormDialog extends Component<
  IFormDialogProps & IFormDialogStyleProps,
  IFormDialogStates
> {
  private static getDerivedStateFromPropsFix(
    props: Readonly<IFormDialogProps & IFormDialogStyleProps>,
    state?: IFormDialogStates
  ): IFormDialogStates {
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

  constructor(props: IFormDialogProps & IFormDialogStyleProps) {
    super(props);
    this.state = FormDialog.getDerivedStateFromPropsFix(props);
  }

  public componentWillReceiveProps(
    nextProps: Readonly<IFormDialogProps & IFormDialogStyleProps>
  ): void {
    if (this.props.config !== nextProps.config) {
      this.setState(state =>
        FormDialog.getDerivedStateFromPropsFix(nextProps, state)
      );
    }
  }

  public render(): ReactNode {
    const { form } = this.state;
    const {
      className: clazz,
      classes,
      style,
      onCancel,
      onSubmit,
      onErrors,
      renderer = new Renderer(),
      open,
      scroll = "paper",
      ...others
    } = this.props;

    const { content, title, footer, header, ...rest } = classes;

    const className: string = classNames(classes!.root, clazz);
    const {} = this.props;
    return (
      <Dialog
        {...{
          className,
          classes: rest,
          open,
          scroll,
          style,
          ...others
        }}
      >
        <DialogTitle className={title}>
          <FormHeader
            {...{
              className: header,
              form
            }}
          />
        </DialogTitle>
        <DialogContent>
          <FormContent
            {...{
              className: content,
              form,
              renderer
            }}
          />
        </DialogContent>
        <DialogActions>
          <FormFooter
            {...{
              className: footer,
              form,
              onCancel,
              onErrors,
              onSubmit
            }}
          />
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles<IFormDialogClassKey, {}>({
  content: {},
  footer: {},
  header: {},
  root: {},
  title: {
    paddingBottom: 0
  },

  paper: {},
  paperFullScreen: {},
  paperFullWidth: {},
  paperScrollBody: {},
  paperScrollPaper: {},
  paperWidthMd: {},
  paperWidthSm: {},
  paperWidthXs: {},
  scrollBody: {},
  scrollPaper: {}
})(FormDialog);
