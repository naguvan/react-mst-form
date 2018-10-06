import * as React from "react";
import { Component, ReactNode } from "react";

import classNames from "classnames";

import { CSSProperties, WithStyles } from "@material-ui/core/styles/withStyles";
import withStyles from "@material-ui/core/styles/withStyles";

import Grid from "@material-ui/core/Grid";

import FormCancel from "../Cancel";
import FormSubmit from "../Submit";

import { IForm } from "../../models/Form";

import { observer } from "mobx-react";

export interface IFooterStyles {
  root: CSSProperties;
}

export interface IFooterStyleProps extends WithStyles<keyof IFooterStyles> {}

export interface IFooterProps {
  style?: CSSProperties;
  className?: string;
  form: IForm;
  onCancel?: (form?: IForm) => void;
  onSubmit: (values: { [key: string]: any }) => void;
  onErrors?: (errors: { [key: string]: Array<string> }) => void;
}

export interface IFooterStates {}

@observer
export class Footer extends Component<
  IFooterProps & IFooterStyleProps,
  IFooterStates
> {
  public render(): ReactNode {
    const { form } = this.props;
    const { cancel, submit } = form;
    const { className: clazz, classes, style } = this.props;
    const { onCancel, onSubmit, onErrors } = this.props;
    const className: string = classNames(classes!.root, clazz);
    return (
      <Grid {...{ className, style }} container={true} spacing={24}>
        {onCancel &&
          cancel && (
            <Grid item xs={6} sm={3}>
              <FormCancel label={cancel} {...{ form, onCancel }} />
            </Grid>
          )}
        <Grid item xs={6} sm={3}>
          <FormSubmit label={submit} {...{ form, onSubmit, onErrors }} />
        </Grid>
      </Grid>
    );
  }
}

export default withStyles<keyof IFooterStyles, {}>({
  root: {
    display: "flex",
    justifyContent: "flex-end"
  }
})(Footer);
