import * as React from "react";
import { Fragment, ReactNode } from "react";

import { IArray } from "reactive-json-schema";

import { IForm } from "../../../models/Form";

import { IRenderer } from "../Renderer";

import { observer } from "mobx-react";

import Type, { ITypeProps, ITypeStates } from "../Type";

import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormLabel from "@material-ui/core/FormLabel";
import IconButton from "@material-ui/core/IconButton";
import ActionAdd from "@material-ui/icons/Add";
import ActionClear from "@material-ui/icons/Clear";

export interface IArrayProps extends ITypeProps<IArray> {
  renderer: IRenderer;
}

export interface IArrayStates extends ITypeStates<IArray> {}

@observer
export default class Array extends Type<IArray, IArrayProps, IArrayStates> {
  protected renderType(type: IArray, form: IForm): ReactNode {
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
                    marginBottom: -10,
                    marginTop: 10
                  }}
                  onClick={
                    // tslint:disable-next-line:jsx-no-lambda
                    e => type.remove(index)
                  }
                >
                  <ActionClear />
                </IconButton>
              )}
              {this.props.renderer.render(element, form)}
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
