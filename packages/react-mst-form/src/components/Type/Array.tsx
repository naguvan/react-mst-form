import * as React from "react";
import { ReactNode, Fragment } from "react";

import { createType, IArray } from "reactive-json-schema";

import { IForm } from "../../models/Form";

import { observer } from "mobx-react";

import Type, { ITypeProps, ITypeStates } from "./Type";

import { renderer } from "./renderer";

import IconButton from "@material-ui/core/IconButton";
import ActionAdd from "@material-ui/icons/Add";
import ActionClear from "@material-ui/icons/Clear";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";

export interface IArrayProps extends ITypeProps<IArray> {}

export interface IArrayStates extends ITypeStates<IArray> {}

@observer
export default class Array extends Type<IArray, IArrayProps, IArrayStates> {
  protected renderType(type: IArray, form: IForm): ReactNode {
    const Type = createType();
    return (
      <>
        <FormControl
          component={"fieldset"}
          error={!type.valid}
          style={{ width: "100%" }}
        >
          <FormLabel component={"legend"} style={{ paddingTop: 20 }}>
            {type.title}
          </FormLabel>
          {type.elements.map((element, index) => (
            <Fragment key={index}>
              {type.dynamic && (
                <IconButton
                  style={{
                    float: "right",
                    marginTop: 10,
                    marginBottom: -10
                  }}
                  onClick={
                    // tslint:disable-next-line:jsx-no-lambda
                    e => type.remove(index)
                  }
                >
                  <ActionClear />
                </IconButton>
              )}
              {renderer(element, form)}
            </Fragment>
          ))}
          {type.dynamic && (
            <IconButton
              style={{ float: "right" }}
              onClick={
                // tslint:disable-next-line:jsx-no-lambda
                e => type.push()
              }
            >
              <ActionAdd />
            </IconButton>
          )}
          {!type.valid &&
            type.errors!.length > 0 && (
              <FormHelperText error>{type.errors!.join(", ")}</FormHelperText>
            )}
        </FormControl>
      </>
    );
  }
}