import * as React from "react";
import { ChangeEvent, ReactNode } from "react";

import { CSSProperties, WithStyles } from "@material-ui/core/styles/withStyles";
import withStyles from "@material-ui/core/styles/withStyles";

import { observer } from "mobx-react";
import { INumber } from "reactive-json-schema";
import { IForm } from "../../../../models/Form";

import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormLabel from "@material-ui/core/FormLabel";
import Slider from "@material-ui/lab/Slider";

import Error from "../../Error";
import Type, { ITypeProps, ITypeStates } from "../../Type";

export interface IRangeStyles {
  group: CSSProperties;
  label: CSSProperties;
  error: CSSProperties;
  stretch: CSSProperties;
}

export interface IRangeStyleProps extends WithStyles<keyof IRangeStyles> {}

export interface IRangeProps extends ITypeProps<INumber> {}

export interface IRangeStates extends ITypeStates<INumber> {}

@observer
export class Range extends Type<
  INumber,
  IRangeProps & IRangeStyleProps,
  IRangeStates
> {
  protected renderType(type: INumber, form: IForm): ReactNode {
    const { classes } = this.props;
    const error = !type.valid ? classes.error : undefined;
    return (
      <FormControl
        component={"fieldset"}
        error={!type.valid}
        className={classes.stretch}
        disabled={type.meta.disabled!}
        margin="normal"
      >
        <FormLabel component={"label"} className={classes.label}>
          {`${type.title} (${type.data})`}
        </FormLabel>
        <FormGroup className={classes.group}>
          <Slider
            disabled={type.meta.disabled!}
            value={type.data}
            min={type.minimum!}
            max={type.maximum!}
            step={type.meta.step || type.multipleOf!}
            onChange={this.onChange}
            classes={{
              thumb: error,
              track: error
            }}
          />
        </FormGroup>
        <Error type={type} />
      </FormControl>
    );
  }

  private onChange = (event: ChangeEvent<{}>, value: number): void => {
    this.props.type.sync(value);
  };
}

export default withStyles<keyof IRangeStyles, {}>(theme => ({
  error: {
    backgroundColor: theme.palette.error.main
  },
  group: {
    marginTop: 28
  },
  label: {
    transform: "translate(0, 1.5px) scale(0.75)",
    transformOrigin: "top left"
  },
  stretch: {
    width: "100%"
  }
}))(Range);
