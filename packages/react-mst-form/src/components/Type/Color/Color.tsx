import * as React from "react";
import { ChangeEvent, ReactNode } from "react";

import { observer } from "mobx-react";
import { IString } from "reactive-json-schema";
import { IForm } from "../../../models/Form";

import TextField from "@material-ui/core/TextField";

import Error from "../Error";
import Type, { ITypeProps, ITypeStates } from "../Type";

export interface IColorProps extends ITypeProps<IString> {}

export interface IColorStates extends ITypeStates<IString> {}

@observer
export default class Color extends Type<IString, IColorProps, IColorStates> {
  protected renderType(type: IString, form: IForm): ReactNode {
    return (
      <>
        <TextField
          key={type.meta.name!}
          type={"color"}
          margin={"normal"}
          fullWidth={true}
          name={type.meta.name!}
          id={type.meta.name!}
          value={type.data || "#000000"}
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
