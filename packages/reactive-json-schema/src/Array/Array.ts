import { detach, IModelType, types } from "mobx-state-tree";

import { observe, toJS } from "mobx";

import { IAnything, mappings } from "../Common";
import { createType, IType, ITypeConfig } from "../Type";
import { isArray, unique } from "../utils";
import { createValue, IValue, IValueAttrs, IValueConfig } from "../Value";

export interface IArrayAttrs extends IValueAttrs<Array<IAnything | null>> {
  readonly additionalItems?: boolean | null;
  readonly minItems?: number | null;
  readonly maxItems?: number | null;
  readonly uniqueItems?: boolean | null;
  readonly items?: ITypeConfig | ITypeConfig[] | null;
}

export interface IArrayConfig
  extends IValueConfig<Array<IAnything | null>, "array">,
    Partial<IArrayAttrs> {}

export interface IArray
  extends IArrayAttrs,
    IValue<Array<IAnything | null>, "array"> {
  readonly elements: IType[];
  readonly dynamic: boolean;
  push(): Promise<void>;
  remove(index: number): Promise<void>;
}

mappings.array = types.late("Array", createArray);

let NArray: IModelType<Partial<IArrayConfig>, IArray>;

export function createArray(): IModelType<Partial<IArrayConfig>, IArray> {
  if (!NArray) {
    const Array: IModelType<Partial<IArrayConfig>, IArray> = types
      .compose(
        "Array",
        createValue<Array<IAnything | null>, "array">(
          "array",
          types.array(types.frozen),
          []
        ),
        types.model({
          additionalItems: types.maybe(types.boolean),
          elements: types.optional(types.array(types.late(createType)), []),
          // items: types.maybe(
          //     types.union(
          //         types.late(createType),
          //         types.array(types.late(createType))
          //     )
          // ),
          items: types.optional(types.frozen, null),
          maxItems: types.maybe(types.number),
          minItems: types.maybe(types.number),
          uniqueItems: types.maybe(types.boolean)
        })
      )
      .views(it => ({
        get dynamic() {
          return !isArray(it.items);
        }
      }))
      .actions(it => ({
        updateIndexValue(index: number, value: IAnything | null): void {
          // const values = [...it.value];
          // values[index] = value;
          // it.setValue(values);
          it.value![index] = value;
        },

        removeIndexValue(index: number): void {
          it.value!.splice(index, 1);
        }
      }))
      .actions(it => ({
        getConfig(value: IAnything | null, index: number, element: any): IType {
          // const element = getSnapshot(it.items!);
          const Type = createType();
          // console.info(value);
          const type = Type.create({
            ...element,
            value: toJS(value)
          } as ITypeConfig);
          // const type = clone(it.items as any);
          // type.setValue(value);
          observe(type, "value", changes => {
            it.updateIndexValue(index, type.value);
            // setTimeout(
            //     () =>
            //         it.updateIndexValue(
            //             index,
            //             type.value
            //         ),
            //     4
            // );
          });
          return type;
        }
      }))
      .actions(it => ({
        updateElements(values: Array<IAnything | null> | null) {
          if (values != null && it.items !== null) {
            it.elements.length = 0;
            if (!isArray(it.items)) {
              it.elements.push(
                ...values.map((value, index) =>
                  it.getConfig(value, index, it.items)
                )
              );
            } else {
              it.items.forEach((item, index) => {
                it.elements.push(
                  it.getConfig(
                    values.length > index ? values[index] : null,
                    index,
                    item
                  )
                );
              });
            }
          }
        },

        async push(): Promise<void> {
          if (it.dynamic) {
            const value = (it.items as IType).default!;
            const index = it.value!.length;
            it.updateIndexValue(index, value);
            it.elements.push(it.getConfig(value, index, it.items));
            await it.validate();
          }
        },

        async remove(index: number): Promise<void> {
          if (it.dynamic) {
            it.removeIndexValue(index);
            const element = it.elements![index];
            detach(element as any);
            // it.elements.splice(index, 1);
            await it.validate();
          }
        }
      }))
      .actions(it => ({
        afterCreate() {
          if (it.minItems !== null && it.minItems < 0) {
            throw new TypeError(`minItems can not be negative`);
          }
          if (it.maxItems !== null && it.maxItems < 0) {
            throw new TypeError(`maxItems can not be negative`);
          }
          it.updateElements(toJS(it.value));
        }
      }))
      .actions(it => ({
        async asyncValidate(value: Array<IAnything | null>): Promise<string[]> {
          const errors = await it.asyncValidateBase(value);
          if (it.elements !== null) {
            for (const element of it.elements) {
              await element.validate();
            }
            // if (isArray(it.items)) {
            //     for (const item of it.items) {
            //         await item.validate();
            //     }
            // } else if (value !== null) {
            //     for (const element of it.elements) {
            //         await element.validate();
            //     }
            //     for (const [index, item] of value.entries()) {
            //         for (const error of await it.items.tryValidate(
            //             item
            //         )) {
            //             errors.push(
            //                 `data[${index}] ${error.replace(
            //                     'Value ',
            //                     ''
            //                 )}`
            //             );
            //         }
            //     }
            // }
          }
          return errors;
        },
        syncValidate(value: Array<IAnything | null>): string[] {
          const errors: string[] = it.syncValidateBase(value);
          if (value === null) {
            return errors;
          }
          if (it.minItems !== null && value.length < it.minItems) {
            errors.push(`should NOT have less than ${it.minItems} items`);
          }
          if (it.maxItems !== null && value.length > it.maxItems) {
            errors.push(`should NOT have more than ${it.maxItems} items`);
          }
          if (
            it.uniqueItems !== null &&
            it.uniqueItems &&
            value.length !== unique(value).length
          ) {
            errors.push(`should NOT have duplicate items`);
          }
          if (
            isArray(it.items) &&
            it.additionalItems !== null &&
            it.additionalItems === false
          ) {
            if (value.length > it.items.length) {
              errors.push(`should NOT have additional items`);
            }
          }
          return errors;
        },
        setValue(value: Array<IAnything | null>): void {
          (it as any).value = value;
          // if (value) {
          //     for (const [index, element] of it.elements.entries()) {
          //         (element as any).setValue(value[index]);
          //     }
          // }
          it.updateElements(toJS(value));
        }
      }))
      .views(it => ({
        get data(): Array<IAnything | null> {
          return it.elements.reduce(
            (data: Array<IAnything | null>, element, index) => {
              data[index] = element!.data;
              return data;
            },
            [...toJS(it.value || [])]
          );
        },
        get valid(): boolean {
          return (
            it.errors!.length === 0 &&
            it.elements.every(element => element!.valid)
          );
        },
        get modified(): boolean {
          return it.elements.some(element => element.modified);
        },
        get validating(): boolean {
          return (
            (it as any)._validating ||
            it.elements.some(element => element.validating)
          );
        }
      }));

    NArray = Array;
  }
  return NArray;
}
