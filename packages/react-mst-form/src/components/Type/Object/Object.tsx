import * as React from "react";
import { ReactNode } from "react";

import { observer } from "mobx-react";
import Layout from "react-flow-layout";
import { ILayout, IObject } from "reactive-json-schema";

import { IRenderContext, ITypeRenderer } from "../Renderer/Type";

import Error from "../Error";
import Type, { ITypeProps, ITypeStates } from "../Type";

export interface IObjectProps extends ITypeProps<IObject> {
  typer: ITypeRenderer;
}

export interface IObjectStates extends ITypeStates<IObject> {}

@observer
export default class NObject extends Type<
  IObject,
  IObjectProps,
  IObjectStates
> {
  protected renderType(context: IRenderContext<IObject>): ReactNode {
    const { type } = context;
    const { layout = type.meta.layout } = context;
    const { typer } = this.props;
    return (
      <>
        <Layout
          center
          items={layout && layout.length > 0 ? layout : this.layout(type)}
        >
          {(item: any) =>
            typer.render({
              ...context,
              layout: undefined,
              type: type.getProperty(item)!
            })
          }
        </Layout>
        <Error type={type} />
      </>
    );
  }

  protected layout(type: IObject): ILayout {
    const properties = type.getProperties();
    const sequences = properties.map((property, index) => {
      const sequence = type.getProperty(property)!.meta.sequence;
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
