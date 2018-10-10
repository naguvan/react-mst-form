import * as React from "react";
import { ReactNode } from "react";

import { observer } from "mobx-react";
import Layout from "react-flow-layout";
import { IObject } from "reactive-json-schema";

import FormHelperText from "@material-ui/core/FormHelperText";

import { IForm } from "../../../models/Form";
import { ILayout } from "../../../models/Section";

import { IRenderer } from "../Renderer";

import Type, { ITypeProps, ITypeStates } from "../Type";

export interface IObjectProps extends ITypeProps<IObject> {
  layout: ILayout;
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
    const { layout, renderer } = this.props;
    return (
      <>
        <Layout center items={layout.length > 0 ? layout : this.layout(type)}>
          {(item: any) => renderer.render(type.getProperty(item)!, form)}
        </Layout>
        {!type.valid &&
          type.errors!.length > 0 && (
            <FormHelperText error>{type.errors!.join(", ")}</FormHelperText>
          )}
      </>
    );
  }

  protected layout(type: IObject): ILayout {
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
    const layout: ILayout = [];
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
