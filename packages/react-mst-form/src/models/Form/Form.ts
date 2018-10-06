import { flow, IModelType, types } from "mobx-state-tree";

import {
  createObject,
  IObject,
  IObjectConfig,
  IType
} from "reactive-json-schema";

import { flatArray } from "../../utils";

export type IFormLayout = Array<
  string | Array<string | Array<string | string[]>>
>;

export interface IFormSection {
  title: string;
  layout: IFormLayout;
}

export interface IFormConfig {
  readonly title: string;
  readonly cancel?: string;
  readonly submit?: string;
  readonly schema: IObjectConfig;
  readonly layout?: IFormLayout;
  readonly sections?: IFormSection[];
}

export interface IForm {
  readonly schema: IObject;
  readonly title: string;
  readonly cancel: string;
  readonly submit: string;
  readonly modified: boolean;
  readonly valid: boolean;
  readonly validating: boolean;
  readonly fields: IType[];
  readonly errors: string[];
  readonly values: { [key: string]: any };
  readonly layout: IFormLayout;
  readonly sections: IFormSection[];
  readonly fieldErrors: { [key: string]: string[] };
  get(key: string): IType | undefined;
  reset(): void;
  validate(): Promise<void>;
}

const Form: IModelType<Partial<IFormConfig>, IForm> = types
  .model("Form", {
    cancel: types.optional(types.string, ""),
    errors: types.optional(types.array(types.string), []),
    layout: types.optional(types.frozen, []),
    schema: types.late("Schema", createObject),
    sections: types.optional(
      types.array(
        types.model({
          layout: types.frozen,
          title: types.string
        })
      ),
      []
    ),
    submit: types.optional(types.string, "Submit"),
    title: types.string
  })
  .volatile(it => ({ _validating: false }))
  .actions(it => ({
    afterCreate() {
      const { schema, layout, sections } = it;
      const layouts = sections.map(section => section.layout);
      const items = flatArray([...layout, ...layouts]);
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
    get fields(): IType[] {
      return it.schema.fields;
    },
    get values(): { [key: string]: any } {
      return it.schema.data!;
    },
    get(key: string): IType | undefined {
      return it.schema.getProperty(key);
    },
    get fieldErrors(): { [key: string]: string[] } {
      return Array.from(it.schema.properties!.entries()).reduce(
        (values, [key, field]) => {
          values[key] = field.errors!.slice(0);
          return values;
        },
        {} as { [key: string]: string[] }
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

export default Form;
