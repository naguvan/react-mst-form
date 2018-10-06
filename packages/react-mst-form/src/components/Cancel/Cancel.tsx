import * as React from "react";
import { Component, MouseEvent, ReactNode } from "react";

import { observer } from "mobx-react";

import { CSSProperties, WithStyles } from "@material-ui/core/styles/withStyles";
import withStyles from "@material-ui/core/styles/withStyles";
import classNames from "classnames";

import Button from "@material-ui/core/Button";

import { IButtonProps } from "../../material";

import { IForm } from "../../models/Form";

export interface ICancelStyles {
  root: CSSProperties;
}

export interface ICancelStyleProps extends WithStyles<keyof ICancelStyles> {}

export interface ICancelProps {
  style?: CSSProperties;
  className?: string;
  form: IForm;
  reset?: boolean;
  label?: string;
  onCancel: (form?: IForm) => void;
}

export interface ICancelStates {}

@observer
export class Cancel extends Component<
  ICancelProps & IButtonProps & ICancelStyleProps,
  ICancelStates
> {
  public render(): ReactNode {
    const {
      className: clazz,
      classes,
      form,
      label,
      variant = "raised",
      color = "primary",
      onCancel,
      ...others
    } = this.props;
    const onClick = this.onCancel;
    const className: string = classNames(classes!.root, clazz);
    return (
      <Button {...{ className, variant, color, ...others, onClick }}>
        {label || form.cancel || "Cancel"}
      </Button>
    );
  }

  private onCancel = async (e: MouseEvent<HTMLButtonElement>) => {
    const { form, reset = false, onCancel } = this.props;
    if (reset) {
      form.reset();
    }
    onCancel(form);
  };
}

export default withStyles<keyof ICancelStyles, {}>({
  root: {}
})(Cancel);
