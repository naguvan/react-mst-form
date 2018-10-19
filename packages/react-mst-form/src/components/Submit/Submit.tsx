import * as React from "react";
import { Component, MouseEvent, ReactNode } from "react";

import { observer } from "mobx-react";
import { IFieldErrors } from "reactive-json-schema";

import { CSSProperties, WithStyles } from "@material-ui/core/styles/withStyles";
import withStyles from "@material-ui/core/styles/withStyles";
import classNames from "classnames";

import Button from "@material-ui/core/Button";

import { IButtonProps } from "../../material";

import { IForm } from "../../models/Form";

export interface ISubmitStyles {
  root: CSSProperties;
}

export interface ISubmitStyleProps extends WithStyles<keyof ISubmitStyles> {}

export interface ISubmitProps {
  style?: CSSProperties;
  className?: string;
  form: IForm;
  label?: string;
  onSubmit?: (values: { [key: string]: any }) => void;
  onErrors?: (errors: IFieldErrors) => void;
}

// tslint:disable-next-line:no-empty-interface
export interface ISubmitStates {}

@observer
export class Submit extends Component<
  ISubmitProps & ISubmitStyleProps & IButtonProps,
  ISubmitStates
> {
  public render(): ReactNode {
    const {
      className: clazz,
      classes,
      form,
      label,
      variant = "contained",
      color = "primary",
      onErrors,
      onSubmit,
      ...others
    } = this.props;
    const onClick = this.onSubmit;
    const className: string = classNames(classes!.root, clazz);
    return (
      <Button
        {...{ className, variant, color, ...others, onClick }}
        disabled={!form.valid}
      >
        {label || form.submit || "Submit"}
      </Button>
    );
  }

  private onSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    const { form, onSubmit, onErrors } = this.props;
    form.validate();
    if (form.valid) {
      if (onSubmit) {
        onSubmit(form.values);
      }
    } else if (onErrors) {
      onErrors(form.fieldErrors);
    }
  };
}

export default withStyles<keyof ISubmitStyles, {}>({
  root: {}
})(Submit);
