import { IArray } from "../Array";
import { INumber } from "../Number";
import { IObject, IObjectConfig } from "../Object";
import { IString } from "../String";
import { IType } from "./Type";

import createType from "./Type";

import { toJS } from "mobx";
import { keys } from "../utils";

const Type = createType();

test("create string type ", () => {
  const type = Type.create({
    minLength: 4,
    title: "naguvan",
    type: "string",
    value: "sk"
  }) as IString;
  expect(type.type).toBe("string");
  expect(type.title).toBe("naguvan");
  expect(type.data).toBe("sk");
  expect(type.minLength).toBe(4);
});

test("create number type ", () => {
  const type = Type.create({
    title: "naguvan",
    type: "number",
    value: 50
  }) as INumber;
  expect(type.type).toBe("number");
  expect(type.title).toBe("naguvan");
  expect(type.data).toBe(50);
});

test("create boolean type ", () => {
  const type = Type.create({
    title: "naguvan",
    type: "boolean",
    value: true
  });
  expect(type.type).toBe("boolean");
  expect(type.title).toBe("naguvan");
  expect(type.name).toBe(type.title);
  expect(type.data).toBe(true);
});

test("create null type ", () => {
  const type = Type.create({
    title: "naguvan",
    type: "null",
    value: null
  });
  expect(type.type).toBe("null");
  expect(type.title).toBe("naguvan");
  expect(type.data).toBe(null);
});

test("create object type", () => {
  const type = Type.create({
    properties: {
      age: {
        title: "age",
        type: "number",
        value: 1
      },
      name: {
        title: "name",
        type: "string",
        value: "naguvan"
      }
    },
    title: "naguvan",
    type: "object"
  } as IObjectConfig) as IObject;
  expect(type.type).toBe("object");
  expect(type.title).toBe("naguvan");
  expect(type.data).toEqual({ name: "naguvan", age: 1 });
  expect(type.additionalProperties).toBeNull();
  expect(type.maxProperties).toBeNull();
  expect(type.minProperties).toBeNull();

  expect(type.properties).not.toBeNull();

  expect(keys(toJS(type.properties!)).length).toBe(2);
  expect(keys(toJS(type.properties!))).toEqual(["age", "name"]);

  expect(type.properties!.get("name")!.title).toBe("name");
  expect(type.properties!.get("name")!.data).toBe("naguvan");
  expect(type.properties!.get("name")!.type).toBe("string");
});

test("create array type", () => {
  const type = Type.create({
    items: {
      type: "number"
    },
    title: "naguvan",
    type: "array"
  }) as IArray;
  expect(type.type).toBe("array");
  expect(type.title).toBe("naguvan");
  expect(type.data).toEqual([]);
  expect(type.additionalItems).toBeNull();
  expect(type.maxItems).toBeNull();
  expect(type.minItems).toBeNull();
  expect(type.uniqueItems).toBeNull();

  expect(type.items).not.toBeNull();
  expect((type.items as IType)!.type).toBe("number");
});

test("test snapshot create", () => {
  const config: IObjectConfig = {
    additionalProperties: null,
    disabled: false,
    errors: [],
    mandatory: false,
    maxProperties: null,
    minProperties: null,
    name: "",
    properties: {
      age: {
        default: 0,
        disabled: false,
        errors: [],
        initial: 0,
        mandatory: false,
        multipleOf: 2,
        name: "",
        title: "age",
        type: "number",
        value: 0,
        visible: true
      },
      name: {
        component: null,
        disabled: false,
        errors: [],
        mandatory: false,
        minLength: 3,
        name: "",
        sequence: null,
        title: "name",
        type: "string",
        value: "",
        visible: true
      }
    },
    required: null,
    title: "snapshot",
    type: "object",
    visible: true
  };

  const type = Type.create(config) as IObject;
  expect(type.type).toBe("object");
  expect(type.title).toBe("snapshot");
});
