import * as React from "react";
import { ChangeEvent, ReactNode } from "react";

import { observer } from "mobx-react";
import { IString } from "reactive-json-schema";
import { IForm } from "../../../models/Form";

import Error from "../Error";
import Type, { ITypeProps, ITypeStates } from "../Type";

import TextField from "@material-ui/core/TextField";

export interface IMultilineProps extends ITypeProps<IString> {}

export interface IMultilineStates extends ITypeStates<IString> {}

@observer
export default class Multiline extends Type<
  IString,
  IMultilineProps,
  IMultilineStates
> {
  protected renderType(type: IString, form: IForm): ReactNode {
    const select: boolean = !!type.enum && type.enum.length > 0;
    return (
      <>
        <TextField
          select={select}
          key={type.meta.name!}
          multiline={true}
          rows={4}
          rowsMax={4}
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
        />
      </>
    );
  }

  private onChange = (event: ChangeEvent<HTMLInputElement>): void => {
    this.props.type.sync(event.target.value);
  };
}
