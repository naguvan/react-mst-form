import * as React from "react";
import { Component, ReactNode } from "react";

import { ISubmitProps, ISubmitStates } from "../../types";

import { observer } from "mobx-react";

import Button from "@material-ui/core/Button";

@observer
export default class Submit extends Component<ISubmitProps, ISubmitStates> {
  constructor(props: ISubmitProps, context: any) {
    super(props, context);
  }

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

  private onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
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
