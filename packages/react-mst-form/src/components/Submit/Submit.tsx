import * as React from "react";
import { Component, MouseEvent, ReactNode } from "react";

import { observer } from "mobx-react";

import Button from "@material-ui/core/Button";

import { IForm } from "../../models/Form";

export interface ISubmitProps {
  form: IForm;
  label?: string;
  onSubmit?: (values: { [key: string]: any }) => void;
  onErrors?: (errors: { [key: string]: Array<string> }) => void;
}

export interface ISubmitStates {}

@observer
export default class Submit extends Component<ISubmitProps, ISubmitStates> {
  public render(): ReactNode {
    const { form, label = "Submit" } = this.props;
    return (
      <Button
        variant={"raised"}
        color={"primary"}
        disabled={!form.valid}
        onClick={this.onSubmit}
      >
        {label}
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
