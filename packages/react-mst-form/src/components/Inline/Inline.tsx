import * as React from "react";
import { Component, ReactNode } from "react";

import classNames from "classnames";

import { CSSProperties, WithStyles } from "@material-ui/core/styles/withStyles";
import withStyles from "@material-ui/core/styles/withStyles";

import FormContent from "../Content";
import FormFooter from "../Footer";
import FormHeader from "../Header";

import IconRenderer, { IIconRenderer } from "../Type/Renderer/Icon";
import TypeRenderer, { ITypeRenderer } from "../Type/Renderer/Type";

import Form, { IFormProps } from "../Form";

import { IForm } from "../../models";

import { observer } from "mobx-react";
import { IFieldErrors } from "reactive-json-schema";

export interface IFormInlineStyles {
  root: CSSProperties;
  header: CSSProperties;
  content: CSSProperties;
  footer: CSSProperties;
  title: CSSProperties;
}

export interface IFormInlineStyleProps
  extends WithStyles<keyof IFormInlineStyles> {}

export interface IFormInlineProps extends IFormProps {
  className?: string;
  style?: CSSProperties;
  children?: null;
  typer?: ITypeRenderer;
  iconer?: IIconRenderer;
  onCancel?: (form?: IForm) => void;
  onErrors?: (errors: IFieldErrors) => void;
  onSubmit: (values: { [key: string]: any }) => void;
}

// tslint:disable-next-line:no-empty-interface
export interface IFormInlineStates {}

@observer
export class FormInline extends Component<
  IFormInlineProps & IFormInlineStyleProps,
  IFormInlineStates
> {
  public render(): ReactNode {
    const { className: clazz, classes, style } = this.props;
    const {
      // form props
      config,
      schema,
      meta,
      snapshot,
      onPatch,
      onSnapshot,

      // inline props
      onCancel,
      onSubmit,
      onErrors,
      iconer = new IconRenderer(),
      typer = new TypeRenderer()
    } = this.props;

    const className: string = classNames(classes!.root, clazz);
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
          <div {...{ className, style }}>
            <FormHeader
              {...{
                className: classes.header,
                classes: { title: classes.title },
                form
              }}
            />
            <FormContent
              {...{ className: classes.content, form, iconer, typer }}
            />
            <FormFooter
              {...{
                className: classes.footer,
                form,
                onCancel,
                onErrors,
                onSubmit
              }}
            />
          </div>
        )}
      </Form>
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
  },
  title: {
    paddingLeft: 10
  }
})(FormInline);
