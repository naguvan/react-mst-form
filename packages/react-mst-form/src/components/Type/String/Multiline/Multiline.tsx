import * as React from "react";
import { ChangeEvent, ReactNode } from "react";

import { observer } from "mobx-react";
import { IString } from "reactive-json-schema";

import Error from "../../Error";
import Type, { ITypeProps, ITypeStates } from "../../Type";

import TextField from "@material-ui/core/TextField";

import { IRenderContext } from "../../Renderer/Type";

export interface IMultilineProps extends ITypeProps<IString> {}

export interface IMultilineStates extends ITypeStates<IString> {}

@observer
export default class Multiline extends Type<
  IString,
  IMultilineProps,
  IMultilineStates
> {
  protected renderType(context: IRenderContext<IString>): ReactNode {
    const { type } = context;
    const select: boolean = !!type.enum && type.enum.length > 0;
    return (
      <TextField
        select={select}
        key={type.meta.name!}
        multiline={true}
        rows={type.meta.rows || 4}
        rowsMax={type.meta.rowsMax || 4}
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
        InputProps={{
          endAdornment: this.adornment("end"),
          startAdornment: this.adornment("start")
        }}
      />
    );
  }

  private onChange = (event: ChangeEvent<HTMLInputElement>): void => {
    this.props.context.type.sync(event.target.value);
  };
}
