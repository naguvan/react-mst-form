import * as React from "react";
import { ChangeEvent, ReactNode } from "react";

import { observer } from "mobx-react";
import { IBoolean } from "reactive-json-schema";

import Error from "../../Error";
import Type, { ITypeProps, ITypeStates } from "../../Type";

import MuiCheckbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import { IRenderContext } from "../../Renderer/Type";

export interface ICheckboxProps extends ITypeProps<IBoolean> {}

export interface ICheckboxStates extends ITypeStates<IBoolean> {}

@observer
export default class Checkbox extends Type<
  IBoolean,
  ICheckboxProps,
  ICheckboxStates
> {
  protected renderType(context: IRenderContext<IBoolean>): ReactNode {
    const { type } = context;
    return (
      <>
        <FormControlLabel
          label={type.title!}
          disabled={type.meta.disabled!}
          control={
            <MuiCheckbox
              key={type.meta.name!}
              name={type.meta.name!}
              checked={type.data}
              color={"primary"}
              disabled={type.meta.disabled!}
              onChange={this.onChange}
            />
          }
        />
        <Error type={type} />
      </>
    );
  }

  private onChange = (event: ChangeEvent<HTMLInputElement>): void => {
    this.props.context.type.sync(event.target.checked);
  };
}
