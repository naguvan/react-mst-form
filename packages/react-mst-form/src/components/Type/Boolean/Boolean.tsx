import * as React from "react";
import { ChangeEvent, ReactNode } from "react";

import { observer } from "mobx-react";
import { IBoolean } from "reactive-json-schema";
import { IForm } from "../../../models/Form";

import Error from "../Error";
import Type, { ITypeProps, ITypeStates } from "../Type";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

export interface IBooleanProps extends ITypeProps<IBoolean> {}

export interface IBooleanStates extends ITypeStates<IBoolean> {}

@observer
export default class Boolean extends Type<
  IBoolean,
  IBooleanProps,
  IBooleanStates
> {
  protected renderType(type: IBoolean, form: IForm): ReactNode {
    return (
      <>
        <FormControlLabel
          label={type.title!}
          disabled={type.meta.disabled!}
          control={
            <Switch
              key={type.meta.name!}
              name={type.meta.name!}
              checked={type.data}
              color={"primary"}
              disabled={type.meta.disabled!}
              onChange={this.onChange}
            />
          }
        />
        <Error type={type} />
      </>
    );
  }

  private onChange = (event: ChangeEvent<HTMLInputElement>): void => {
    this.props.type.sync(event.target.checked);
  };
}
