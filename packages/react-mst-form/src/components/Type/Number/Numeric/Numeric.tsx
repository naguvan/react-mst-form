import * as React from "react";
import { ChangeEvent, ReactNode } from "react";

import { observer } from "mobx-react";
import { INumber } from "reactive-json-schema";

import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";

import Error from "../../Error";
import Type, { ITypeProps, ITypeStates } from "../../Type";

import { toNumber } from "../../../../utils";

import { IRenderContext } from "../../Renderer/Type";

export interface INumericProps extends ITypeProps<INumber> {}

export interface INumericStates extends ITypeStates<INumber> {}

@observer
export default class Numeric extends Type<
  INumber,
  INumericProps,
  INumericStates
> {
  protected renderType(context: IRenderContext<INumber>): ReactNode {
    const { type } = context;
    const { options } = type.meta;
    const select: boolean =
      type.meta.component === "select" || (!!options && options.length > 0);
    return (
      <TextField
        select={select}
        key={type.meta.name!}
        type={"number"}
        margin={"normal"}
        fullWidth={true}
        name={type.meta.name!}
        id={type.meta.name!}
        value={type.data || ""}
        disabled={type.meta.disabled!}
        error={!type.valid}
        label={type.title!}
        helperText={Error.getError(type)}
        onChange={this.onChange}
      >
        {options &&
          options.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
      </TextField>
    );
  }

  private onChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { type } = this.props.context;
    type.sync(toNumber(event.target.value, type.meta.value!));
  };
}
