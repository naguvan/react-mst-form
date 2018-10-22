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

import IconRenderer, { IIconRenderer } from "../Type/Renderer/Icon";
import TypeRenderer, { ITypeRenderer } from "../Type/Renderer/Type";

import Form, { IFormProps } from "../Form";

import { observer } from "mobx-react";
import { IForm } from "../../models";

import { IFieldErrors } from "reactive-json-schema";

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

export interface IFormDialogProps extends IFormProps, DialogProps {
  className?: string;
  style?: CSSProperties;
  children?: null;
  renderer?: ITypeRenderer;
  iconer?: IIconRenderer;
  onCancel?: (form?: IForm) => void;
  onErrors?: (errors: IFieldErrors) => void;
  onSubmit: (values: { [key: string]: any }) => void;
}

// tslint:disable-next-line:no-empty-interface
export interface IFormDialogStates {}

@observer
export class FormDialog extends Component<
  IFormDialogProps & IFormDialogStyleProps,
  IFormDialogStates
> {
  constructor(props: IFormDialogProps & IFormDialogStyleProps) {
    super(props);
  }

  public render(): ReactNode {
    const {
      // form props
      config,
      schema,
      meta,
      snapshot,
      onPatch,
      onSnapshot,

      // dialog props
      className: clazz,
      classes,
      style,
      onCancel,
      onSubmit,
      onErrors,
      iconer = new IconRenderer(),
      renderer = new TypeRenderer(),
      open,
      scroll = "paper",
      ...others
    } = this.props;

    const { content, title, footer, header, ...rest } = classes;

    const className: string = classNames(classes!.root, clazz);
    const {} = this.props;
    return (
      <Form
        {...{
          config,
          meta,
          onPatch,
          onSnapshot,
          schema,
          snapshot
        }}
      >
        {(form: IForm) => (
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
                  iconer,
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
        )}
      </Form>
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
