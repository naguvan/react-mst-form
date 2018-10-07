import * as React from "react";
import { ReactNode } from "react";

import { observer } from "mobx-react";
import Layout from "react-flow-layout";
import { IObject } from "reactive-json-schema";

import FormHelperText from "@material-ui/core/FormHelperText";

import { IForm, IFormLayout } from "../../../models/Form";

import { IRenderer } from "../Renderer";

import Type, { ITypeProps, ITypeStates } from "../Type";

export interface IObjectProps extends ITypeProps<IObject> {
  layout: IFormLayout;
  renderer: IRenderer;
}

export interface IObjectStates extends ITypeStates<IObject> {}

@observer
export default class NObject extends Type<
  IObject,
  IObjectProps,
  IObjectStates
> {
  protected renderType(type: IObject, form: IForm): ReactNode {
    const { layout } = this.props;
    return (
      <>
        <Layout
          center
          items={layout.length > 0 ? layout : this.layout(type)}
          render={this.getFieldRenderer() as any}
        />
        {!type.valid &&
          type.errors!.length > 0 && (
            <FormHelperText error>{type.errors!.join(", ")}</FormHelperText>
          )}
      </>
    );
  }

  protected getFieldRenderer(): (item: string) => ReactNode {
    const { type, form, renderer } = this.props;
    return item => renderer.render(type.getProperty(item)!, form);
  }

  protected layout(type: IObject): IFormLayout {
    const properties = type.getProperties();
    const sequences = properties.map((property, index) => {
      const sequence = type.getProperty(property)!.sequence;
      return {
        property,
        sequence: sequence !== null && sequence !== undefined ? sequence : index
      };
    });
    sequences.sort(
      (left, right) =>
        left.sequence === right.sequence
          ? 0
          : left.sequence > right.sequence
            ? 1
            : -1
    );
    const mappings = new Map<number, string[]>();
    for (const { property, sequence } of sequences) {
      // tslint:disable-next-line:no-shadowed-variable
      let layout = mappings.get(sequence);
      if (!layout) {
        mappings.set(sequence, (layout = []));
      }
      layout.push(property);
    }
    const layout: IFormLayout = [];
    for (const [sequence, values] of mappings.entries()) {
      if (values.length === 1) {
        layout.push(values[0]);
      } else {
        layout.push(values);
      }
    }
    return layout;
  }
}
