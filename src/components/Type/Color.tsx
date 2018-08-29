import * as React from "react";
import { ReactNode } from "react";

import { IStringProps, IStringStates } from "../../types";
import { IString, IForm } from "../../types";

import { observer } from "mobx-react";

import Base from "./Base";

import TextField from "@material-ui/core/TextField";

@observer
export default class Color extends Base<IString, IStringProps, IStringStates> {
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
