import * as React from "react";
import { Component, MouseEvent, ReactNode } from "react";

import { observer } from "mobx-react";

import Button from "@material-ui/core/Button";

import { IForm } from "../../models/Form";

export interface ICancelProps {
  form: IForm;
  label?: string;
  onCancel: (form?: IForm) => void;
}

export interface ICancelStates {}

@observer
export default class Cancel extends Component<ICancelProps, ICancelStates> {
  public render(): ReactNode {
    const { form, label = "Cancel" } = this.props;
    return (
      <Button variant={"raised"} color={"primary"} onClick={this.onCancel}>
        {label}
      </Button>
    );
  }

  private onCancel = async (e: MouseEvent<HTMLButtonElement>) => {
    const { form, onCancel } = this.props;
    form.reset();
    onCancel(form);
  };
}
