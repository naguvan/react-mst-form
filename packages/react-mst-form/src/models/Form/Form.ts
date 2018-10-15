import { flow, IModelType, types } from "mobx-state-tree";

import {
  createType,
  IFieldErrors,
  IObject,
  IType,
  ITypeConfig
} from "reactive-json-schema";

import { flatArray } from "../../utils";

import Section, { ILayout, ISection, ISectionConfig } from "../Section";

export interface IFormConfig {
  readonly title: string;
  readonly cancel?: string;
  readonly submit?: string;
  readonly schema: ITypeConfig;
  readonly layout?: ILayout;
  readonly sections?: ISectionConfig[];
}

export interface IForm {
  readonly schema: IType;
  readonly title: string;
  readonly cancel: string;
  readonly submit: string;
  readonly modified: boolean;
  readonly valid: boolean;
  readonly validating: boolean;
  readonly fields: IType[];
  readonly errors: string[];
  readonly values: { [key: string]: any };
  readonly layout: ILayout;
  readonly sections: ISection[];
  readonly selected: ISection | undefined;
  readonly fieldErrors: IFieldErrors;
  get(key: string): IType | undefined;
  reset(): void;
  validate(): Promise<void>;
  makeSelection(section: ISection): void;
}

const Form: IModelType<Partial<IFormConfig>, IForm> = types
  .model("Form", {
    cancel: types.optional(types.string, ""),
    errors: types.optional(types.array(types.string), []),
    layout: types.optional(types.frozen, []),
    schema: types.late("Schema", createType),
    sections: types.optional(types.array(Section), []),
    submit: types.optional(types.string, "Submit"),
    title: types.string
  })
  .volatile(it => ({ _validating: false }))
  .actions(it => ({
    afterCreate() {
      const { schema, layout, sections } = it;
      const layouts = sections.map(section => section.layout);
      const items = flatArray([...layout, ...layouts]);
      if (sections.length > 0 && !sections.some(section => section.selected)) {
        sections[0].makeSelection(true);
      }
      const invalids =
        schema.type === "object"
          ? items.filter(item => !schema.properties!.has(item))
          : [];

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
      if (it.schema.type === "object") {
        return it.schema.fields!;
      }
      return [it.schema];
    },

    get values(): { [key: string]: any } {
      if (it.schema.type === "object") {
        return it.schema.data!;
      }
      return { [`${it.schema.title}`]: it.schema.data };
    },

    get(key: string): IType | undefined {
      return (it.schema as IObject).getProperty
        ? (it.schema as IObject).getProperty(key)
        : undefined;
    },

    get fieldErrors(): IFieldErrors {
      if (!(it.schema as IObject).properties) {
        return {
          errors: it.schema.errors!.slice(0)
        };
      }
      return (it.schema as IObject).getFieldErrors();
    },

    get selected(): ISection | undefined {
      return it.sections.find(section => section.selected);
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

    makeSelection(selected: ISection): void {
      for (const section of it.sections) {
        section.makeSelection(section === selected);
      }
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
