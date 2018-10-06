import * as React from "react";
import { ReactNode } from "react";

import { IString } from "reactive-json-schema";

import { IForm } from "../../../models/Form";

import { observer } from "mobx-react";

import TextField from "@material-ui/core/TextField";

import Type, { ITypeProps, ITypeStates } from "../Type";

export interface IColorProps extends ITypeProps<IString> {}

export interface IColorStates extends ITypeStates<IString> {}

@observer
export default class Color extends Type<IString, IColorProps, IColorStates> {
  protected renderType(type: IString, form: IForm): ReactNode {
    return (
      <>
        <TextField
          key={type.name!}
          type={"color"}
          margin={"normal"}
          fullWidth={true}
          name={type.name!}
          id={type.name!}
          value={type.data || "#000000"}
          disabled={type.disabled!}
          error={!type.valid}
          label={type.title}
          helperText={type.errors!.join(", ")!}
          // tslint:disable-next-line:jsx-no-lambda
          onChange={e => type.sync(e.target.value)}
        />
      </>
    );
  }
}
