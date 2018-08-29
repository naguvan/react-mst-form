import { IModelType, types, flow } from "mobx-state-tree";
export type __IModelType = IModelType<any, any>;

import { IType } from "../../types";
import { IFormConfig, IForm } from "../../types";

import createObject from "../Type/Object";

import { flatArray } from "../../utils";

export const Form: IModelType<Partial<IFormConfig>, IForm> = types
  .model("Form", {
    title: types.string,
    submit: types.optional(types.string, "Submit"),
    schema: types.late("Schema", createObject),
    errors: types.optional(types.array(types.string), []),
    layout: types.optional(types.frozen, []),
    sections: types.optional(
      types.array(
        types.model({
          title: types.string,
          layout: types.frozen
        })
      ),
      []
    )
  })
  .volatile(it => ({ _validating: false }))
  .actions(it => ({
    afterCreate() {
      const { schema, layout, sections } = it;
      const layouts = sections.map(section => section.layout);
      const items = flatArray<string>([...layout, ...layouts]);
      const invalids = items.filter(item => !schema.properties!.has(item));

      if (invalids.length) {
        throw new TypeError(
          `[${invalids
            .map(invalid => `'${invalid}'`)
            .join(", ")}] layout field${
            invalids.length === 1 ? " is" : "s are"
          } not configured.`
        );
      }
    }
  }))
  .views(it => ({
    get fields(): Array<IType> {
      return it.schema.fields;
    },
    get values(): { [key: string]: any } {
      return it.schema.data!;
    },
    get(key: string): IType | undefined {
      return it.schema.getProperty(key);
    },
    get fieldErrors(): { [key: string]: Array<string> } {
      return Array.from(it.schema.properties!.entries()).reduce(
        (values, [key, field]) => {
          values[key] = field.errors!.slice(0);
          return values;
        },
        {} as { [key: string]: Array<string> }
      );
    }
  }))
  .views(it => ({
    get valid(): boolean {
      return it.schema.valid;
    },
    get modified(): boolean {
      return it.schema.modified;
    },
    get validating(): boolean {
      return it._validating || it.schema.validating;
    }
  }))
  .actions(it => ({
    reset(): void {
      it.errors.length = 0;
      it.schema.reset();
    },
    validate: flow<void>(function*() {
      if (it.validating) {
        return [];
      }
      it._validating = true;
      yield it.schema.validate();
      it._validating = false;
    })
  }));
