import * as React from "react";
import { ChangeEvent, ReactNode } from "react";

import { observer } from "mobx-react";
import { IString } from "reactive-json-schema";

import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";

import Error from "../../Error";
import Type, { ITypeProps, ITypeStates } from "../../Type";

import { IRenderContext } from "../../Renderer/Type";

export interface ITextProps extends ITypeProps<IString> {}

export interface ITextStates extends ITypeStates<IString> {}

const mappings: { [key: string]: string } = {
  date: "date",
  datetime: "datetime-local",
  password: "password",
  select: "select",
  text: "text",
  time: "time"
};

@observer
export default class Text extends Type<IString, ITextProps, ITextStates> {
  protected renderType(context: IRenderContext<IString>): ReactNode {
    const { type } = context;
    const typex = mappings[type.meta.component!] || "text";
    const { options } = type.meta;
    const select: boolean =
      typex === "select" || (!!options && options.length > 0);
    return (
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
        InputProps={{
          endAdornment: this.adornment("end"),
          startAdornment: this.adornment("start")
        }}
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
    this.props.context.type.sync(event.target.value);
  };
}
