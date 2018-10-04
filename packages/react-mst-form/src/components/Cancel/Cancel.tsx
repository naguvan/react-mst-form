import * as React from "react";
import { Component, MouseEvent, ReactNode } from "react";

import { ICancelProps, ICancelStates } from "../../types";

import { observer } from "mobx-react";

import Button from "@material-ui/core/Button";

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
