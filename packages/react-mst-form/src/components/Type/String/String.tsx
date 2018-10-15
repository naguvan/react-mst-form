import * as React from "react";
import { ChangeEvent, ReactNode } from "react";

import { observer } from "mobx-react";
import { IString } from "reactive-json-schema";
import { IForm } from "../../../models/Form";

import Error from "../Error";
import Type, { ITypeProps, ITypeStates } from "../Type";

import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";

export interface IStringProps extends ITypeProps<IString> {}

export interface IStringStates extends ITypeStates<IString> {}

const mappings: { [key: string]: string } = {
  date: "date",
  datetime: "datetime-local",
  password: "password",
  select: "select",
  text: "text",
  time: "time"
};

@observer
export default class String extends Type<IString, IStringProps, IStringStates> {
  protected renderType(type: IString, form: IForm): ReactNode {
    const typex = mappings[type.meta.component!] || "text";
    const select: boolean =
      typex === "select" ||
      (!!type.meta.options && type.meta.options.length > 0);
    return (
      <>
        <TextField
          select={select}
          key={type.meta.name!}
          type={typex}
          margin={"normal"}
          fullWidth={true}
          name={type.meta.name!}
          id={type.meta.name!}
          value={type.data || ""}
          disabled={type.meta.disabled!}
          error={!type.valid}
          label={type.title}
          helperText={Error.getError(type)}
          onChange={this.onChange}
          InputLabelProps={typex.indexOf("date") === 0 ? { shrink: true } : {}}
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
    this.props.type.sync(event.target.value);
  };
}
