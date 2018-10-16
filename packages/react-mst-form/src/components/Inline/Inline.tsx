import * as React from "react";
import { ReactNode } from "react";

import classNames from "classnames";

import { CSSProperties, WithStyles } from "@material-ui/core/styles/withStyles";
import withStyles from "@material-ui/core/styles/withStyles";

import FormContent from "../Content";
import FormFooter from "../Footer";
import FormHeader from "../Header";
import Renderer from "../Type/Renderer";

import Form, { IFormProps, IFormStates } from "../Form";

import { observer } from "mobx-react";

export interface IFormInlineStyles {
  root: CSSProperties;
  header: CSSProperties;
  content: CSSProperties;
  footer: CSSProperties;
}

export interface IFormInlineStyleProps
  extends WithStyles<keyof IFormInlineStyles> {}

// tslint:disable-next-line:no-empty-interface
export interface IFormInlineProps extends IFormProps {}

// tslint:disable-next-line:no-empty-interface
export interface IFormInlineStates extends IFormStates {}

@observer
export class FormInline extends Form<
  IFormInlineProps & IFormInlineStyleProps,
  IFormInlineStates
> {
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

export default withStyles<keyof IFormInlineStyles, {}>({
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
})(FormInline);
