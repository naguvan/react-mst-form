import * as React from "react";
import { ChangeEvent, ReactNode } from "react";

import { observer } from "mobx-react";
import { IBoolean } from "reactive-json-schema";

import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";

import Error from "../../Error";
import Type, { ITypeProps, ITypeStates } from "../../Type";

import { toBoolean } from "../../../../utils";

import { IRenderContext } from "../../Renderer/Type";

export interface ISelectProps extends ITypeProps<IBoolean> {}

export interface ISelectStates extends ITypeStates<IBoolean> {}

@observer
export default class Select extends Type<
  IBoolean,
  ISelectProps,
  ISelectStates
> {
  protected renderType(context: IRenderContext<IBoolean>): ReactNode {
    const { type } = context;
    const { options } = type.meta;
    return (
      <TextField
        select={true}
        key={type.meta.name!}
        type={"text"}
        margin={"normal"}
        fullWidth={true}
        name={type.meta.name!}
        id={type.meta.name!}
        value={String(type.data)}
        disabled={type.meta.disabled!}
        error={!type.valid}
        label={type.title}
        helperText={Error.getError(type)}
        onChange={this.onChange}
        InputProps={{
          endAdornment: this.adornment("end"),
          startAdornment: this.adornment("start")
        }}
      >
        {options &&
          options.map(option => (
            <MenuItem key={String(option.value)} value={String(option.value)}>
              {option.label}
            </MenuItem>
          ))}
      </TextField>
    );
  }

  private onChange = (event: ChangeEvent<HTMLInputElement>): void => {
    this.props.context.type.sync(toBoolean(event.target.value));
  };
}
