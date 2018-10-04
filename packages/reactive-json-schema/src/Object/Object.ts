import { IModelType, types } from "mobx-state-tree";

import { toJS } from "mobx";

import { keys, unique } from "../utils";

import { mappings } from "../Common";

import { createType } from "../Type";

import { createValue, IValue, IValueAttrs, IValueConfig } from "../Value";

import { IType, ITypeConfig } from "../Type";

export interface IObjectAttrs extends IValueAttrs<object | null> {
  readonly required?: string[] | null;
  readonly minProperties?: number | null;
  readonly maxProperties?: number | null;
}

export interface IObjectConfig
  extends IValueConfig<object | null, "object">,
    Partial<IObjectAttrs> {
  readonly properties?: { [key: string]: ITypeConfig };
  readonly additionalProperties?: boolean | ITypeConfig | null;
}

export interface IObject extends IObjectAttrs, IValue<object | null, "object"> {
  readonly properties?: ReadonlyMap<string, IType> | null;
  readonly additionalProperties?: boolean | IType | null;
  readonly fields: IType[];
  readonly modified: boolean;
  getProperty(property: string): IType | undefined;
  getProperties(): string[];
}

mappings.object = types.late("Object", createObject);

let NObject: IModelType<Partial<IObjectConfig>, IObject>;

export function createObject(): IModelType<Partial<IObjectConfig>, IObject> {
  if (!NObject) {
    const XObject = types
      .compose(
        "Object",
        createValue<object | null, "object">(
          "object",
          types.map(types.frozen),
          {}
        ),
        types.model({
          additionalProperties: types.maybe(
            types.union(types.boolean, types.late(createType))
          ),
          maxProperties: types.maybe(types.number),
          minProperties: types.maybe(types.number),
          properties: types.maybe(
            types.map<any, IType>(types.late(createType))
          ),
          required: types.maybe(types.array(types.string))
        })
      )
      .actions(it => ({
        updateProps(value: object | null) {
          if (value) {
            keys(value).forEach(key => {
              const type = it.properties!.get(key);
              if (type) {
                return (type as any).setValue((value as any)[key]);
              }
            });
          }
        }
      }))
      .volatile(it => ({
        getActuals(value: Map<string, object> | null): string[] {
          if (value === null) {
            return [];
          }
          const props: string[] = [];
          value.forEach((v, key) => props.push(key));
          return props;
        }
      }))
      .volatile(it => ({
        getAdditionals(value: Map<string, object> | null): string[] {
          return it.getActuals(value).filter(prop => !it.properties!.has(prop));
        },

        getProperties(): string[] {
          if (it.properties) {
            return Array.from(it.properties.keys()).slice(0);
          }
          return [];
        },

        getProperty(property: string): IType | undefined {
          return it.properties !== null
            ? (it.properties!.get(property) as IType)
            : undefined;
        }
      }))
      .views(it => ({
        get count() {
          return it.properties != null ? it.properties.size : 0;
        },
        get valid(): boolean {
          return (
            it.errors!.length === 0 &&
            it
              .getProperties()
              .every(property => it.getProperty(property)!.valid)
          );
        },
        get fields(): IType[] {
          return Array.from(it.properties!.values()) as IType[];
        }
      }))
      .actions(it => ({
        afterCreate() {
          if (it.minProperties !== null && it.minProperties < 0) {
            throw new TypeError(`minProperties can not be negative`);
          }
          if (it.maxProperties !== null && it.maxProperties < 0) {
            throw new TypeError(`maxProperties can not be negative`);
          }
          if (
            it.required !== null &&
            it.required.length !== unique(it.required).length
          ) {
            throw new TypeError(
              `required should not have duplicate properties`
            );
          }

          for (const [key, field] of it.properties!.entries()) {
            field.setName(key);
            if (!field.title) {
              field.setTitle(key);
            }
          }

          if (it.required !== null) {
            for (const required of it.required) {
              const property = it.getProperty(required);
              if (property) {
                property.setMandatory(true);
              }
            }
          }

          it.updateProps(toJS(it.value));
        }
      }))
      .actions(it => ({
        async asyncValidate(
          value: Map<string, object> | null
        ): Promise<string[]> {
          const errors = await it.asyncValidateBase(value);
          if (
            value !== null &&
            it.additionalProperties !== null &&
            typeof toJS(it.additionalProperties) !== "boolean"
          ) {
            const additionals = it.getAdditionals(value);
            if (additionals.length > 0) {
              const extratype = it.additionalProperties as IType;
              for (const additional of additionals) {
                for (const error of await extratype.tryValidate(
                  value.get(additional)
                )) {
                  errors.push(
                    `additional property '${additional}' ${error.replace(
                      "Value ",
                      ""
                    )}`
                  );
                }
              }
            }
          }

          for (const property of it.getProperties()) {
            await it.getProperty(property)!.validate();
          }
          return errors;
        },
        syncValidate(value: Map<string, object> | null): string[] {
          const errors: string[] = it.syncValidateBase(value);
          if (value === null) {
            return errors;
          }
          if (it.minProperties !== null && value.size < it.minProperties) {
            errors.push(
              `should NOT have less than ${it.minProperties} properties`
            );
          }
          if (it.maxProperties !== null && value.size > it.maxProperties) {
            errors.push(
              `should NOT have more than ${it.maxProperties} properties`
            );
          }
          // required is handled in respective fields
          // if (it.required !== null) {
          //     const actuals = it.getActuals(value);
          //     const requireds = it.required.filter(
          //         required => !actuals.includes(required)
          //     );
          //     if (requireds.length > 0) {
          //         errors.push(
          //             `should have required properties [${requireds.join(
          //                 ', '
          //             )}]`
          //         );
          //     }
          // }
          if (
            it.additionalProperties !== null &&
            typeof toJS(it.additionalProperties) === "boolean"
          ) {
            const additionals = it.getAdditionals(value);
            if (additionals.length > 0) {
              if (!it.additionalProperties) {
                errors.push(
                  `should NOT have additional properties [${additionals.join(
                    ", "
                  )}]`
                );
              }
            }
          }
          return errors;
        },
        setValue(value: object | null): void {
          (it as any).value = value;
          it.updateProps(toJS(value));
        },
        reset(): void {
          it.errors!.length = 0;
          it.fields.forEach(field => field.reset());
        }
      }))
      .views(it => ({
        get data(): object {
          const properties = it.getProperties();
          return properties.reduce(
            (data: any, key: string) => {
              const type = it.properties!.get(key);
              data[key] = type!.data;
              return data;
            },
            {
              ...toJS(it.value || {})
            }
          );
        },
        get modified(): boolean {
          return it.fields.some(field => field.modified);
        },
        get validating(): boolean {
          return (
            (it as any)._validating || it.fields.some(field => field.validating)
          );
        }
      }));

    NObject = XObject as any;
  }
  return NObject as IModelType<Partial<IObjectConfig>, IObject>;
}
