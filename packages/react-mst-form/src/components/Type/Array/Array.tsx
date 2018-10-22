import * as React from "react";
import { Fragment, MouseEvent, ReactNode } from "react";

import { observer } from "mobx-react";
import { IArray } from "reactive-json-schema";
import { ITypeRenderer } from "../Renderer/Type";

import Error from "../Error";
import Type, { ITypeProps, ITypeStates } from "../Type";

import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import IconButton from "@material-ui/core/IconButton";
import ActionAdd from "@material-ui/icons/Add";
import ActionClear from "@material-ui/icons/Clear";

import { toNumber } from "../../../utils";

import { IRenderContext } from "../Renderer/Type";

export interface IArrayProps extends ITypeProps<IArray> {
  renderer: ITypeRenderer;
}

export interface IArrayStates extends ITypeStates<IArray> {}

@observer
export default class Array extends Type<IArray, IArrayProps, IArrayStates> {
  protected renderType(context: IRenderContext<IArray>): ReactNode {
    const { type } = context;
    const { renderer } = this.props;
    return (
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
                data-index={index}
                onClick={this.onRemove}
              >
                <ActionClear />
              </IconButton>
            )}
            {renderer.render({ ...context, type: element })}
          </Fragment>
        ))}
        {type.dynamic && (
          <IconButton style={{ float: "right" }} onClick={this.onPush}>
            <ActionAdd />
          </IconButton>
        )}
        <Error type={type} />
      </FormControl>
    );
  }

  private onRemove = (event: MouseEvent<HTMLButtonElement>): void => {
    const index = event.currentTarget.getAttribute("data-index") || "";
    this.props.context.type.remove(toNumber(index, 0));
  };

  private onPush = (event: MouseEvent<HTMLElement>): void => {
    this.props.context.type.push();
  };
}
