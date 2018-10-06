import * as React from "react";
import { Component, MouseEvent, ReactNode } from "react";

import { observer } from "mobx-react";

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
  onErrors?: (errors: { [key: string]: Array<string> }) => void;
}

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
      variant = "raised",
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

  private onSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    const { form, onSubmit, onErrors } = this.props;
    await form.validate();
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
