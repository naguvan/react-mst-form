import * as React from "react";
import { ChangeEvent, ReactNode } from "react";

import { observer } from "mobx-react";
import { IBoolean } from "reactive-json-schema";
import { IForm } from "../../../../models/Form";

import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";

import Error from "../../Error";
import Type, { ITypeProps, ITypeStates } from "../../Type";

import { toBoolean } from "../../../../utils";

export interface ISelectProps extends ITypeProps<IBoolean> {}

export interface ISelectStates extends ITypeStates<IBoolean> {}

@observer
export default class Select extends Type<
  IBoolean,
  ISelectProps,
  ISelectStates
> {
  protected renderType(type: IBoolean, form: IForm): ReactNode {
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
    this.props.type.sync(toBoolean(event.target.value));
  };
}
