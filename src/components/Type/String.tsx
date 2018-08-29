import * as React from "react";
import { ReactNode } from "react";

import { IStringProps, IStringStates } from "../../types";
import { IString, IForm } from "../../types";

import { observer } from "mobx-react";

import Base from "./Base";

import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

@observer
export default class String extends Base<IString, IStringProps, IStringStates> {
  protected renderType(type: IString, form: IForm): ReactNode {
    const select: boolean = !!type.enum && type.enum.length > 0;
    return (
      <>
        <TextField
          select={select}
          key={type.name!}
          type={"text"}
          margin={"normal"}
          fullWidth={true}
          name={type.name!}
          id={type.name!}
          value={type.data || ""}
          disabled={type.disabled!}
          error={!type.valid}
          label={type.title}
          helperText={type.errors!.join(", ")}
          // tslint:disable-next-line:jsx-no-lambda
          onChange={e => type.sync(e.target.value)}
        >
          {type.options &&
            type.options.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
        </TextField>
      </>
    );
  }
}
