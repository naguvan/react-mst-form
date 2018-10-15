import * as React from "react";
import { ChangeEvent, ReactNode } from "react";

import { observer } from "mobx-react";
import { INumber } from "reactive-json-schema";
import { IForm } from "../../../models/Form";

import Error from "../Error";
import Type, { ITypeProps, ITypeStates } from "../Type";

import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";

import { toNumber } from "../../../utils";

export interface INumberProps extends ITypeProps<INumber> {}

export interface INumberStates extends ITypeStates<INumber> {}

@observer
export default class Number extends Type<INumber, INumberProps, INumberStates> {
  protected renderType(type: INumber, form: IForm): ReactNode {
    const select: boolean = !!type.enum && type.enum.length > 0;
    return (
      <>
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
          {type.meta.options &&
            type.meta.options.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
        </TextField>
      </>
    );
  }

  private onChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { type } = this.props;
    type.sync(toNumber(event.target.value, type.meta.value!));
  };
}
