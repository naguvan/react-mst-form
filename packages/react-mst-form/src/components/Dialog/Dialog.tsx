import * as React from "react";
import { ReactNode } from "react";

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
import Renderer from "../Type/Renderer";

import Form, { IFormProps, IFormStates } from "../Form";

import { observer } from "mobx-react";

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
  style?: CSSProperties;
  onSubmit: (values: { [key: string]: any }) => void;
}

// tslint:disable-next-line:no-empty-interface
export interface IFormDialogStates extends IFormStates {}

@observer
export class FormDialog extends Form<
  IFormDialogProps & IFormDialogStyleProps,
  IFormDialogStates
> {
  constructor(props: IFormDialogProps & IFormDialogStyleProps) {
    super(props);
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
      // tslint:disable-next-line:no-shadowed-variable
      onPatch,
      // tslint:disable-next-line:no-shadowed-variable
      onSnapshot,
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
