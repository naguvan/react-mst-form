import * as React from "react";
import { ChangeEvent, ReactNode } from "react";

import { observer } from "mobx-react";
import { INumber } from "reactive-json-schema";

import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";

import Error from "../../Error";
import Type, { ITypeProps, ITypeStates } from "../../Type";

import { toNumber } from "../../../../utils";

import { IRenderContext } from "../../Renderer/Type";

export interface IRadiosProps extends ITypeProps<INumber> {}

export interface IRadiosStates extends ITypeStates<INumber> {}

@observer
export default class Radios extends Type<INumber, IRadiosProps, IRadiosStates> {
  protected renderType(context: IRenderContext<INumber>): ReactNode {
    const { type } = context;
    const { options } = type.meta;
    return (
      <FormControl
        component={"fieldset"}
        error={!type.valid}
        style={{ width: "100%" }}
        disabled={type.meta.disabled!}
      >
        <FormLabel component={"legend"} style={{ paddingTop: 20 }}>
          {type.title}
        </FormLabel>
        <RadioGroup
          row={type.meta.row || false}
          aria-label={type.meta.name!}
          name={type.meta.name!}
          value={String(type.data)}
          onChange={this.onChange}
        >
          {options &&
            options.map(option => (
              <FormControlLabel
                key={String(option.value)}
                value={String(option.value)}
                control={<Radio />}
                label={option.label}
                disabled={type.meta.disabled!}
              />
            ))}
        </RadioGroup>
        <Error type={type} />
      </FormControl>
    );
  }

  private onChange = (event: ChangeEvent<{}>, value: string): void => {
    this.props.context.type.sync(toNumber(value, 0));
  };
}
