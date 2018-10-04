// tslint:disable:max-file-line-count

import { createArray } from "./Array";

import { IArrayConfig } from "./Array";

import { ITypeConfig } from "../Type";

import { toJS } from "mobx";

const config: IArrayConfig = {
  items: {
    type: "number"
  },
  title: "naguvan",
  type: "array"
};

const NArray = createArray();

test("create array type", () => {
  const type = NArray.create(config);
  expect(type.type).toBe("array");
  expect(type.title).toBe("naguvan");
  expect(type.data).toEqual([]);
  expect(type.additionalItems).toBeNull();
  expect(type.maxItems).toBeNull();
  expect(type.minItems).toBeNull();
  expect(type.uniqueItems).toBeNull();

  expect(type.items).not.toBeNull();
  expect((type.items as ITypeConfig)!.type).toBe("number");
});

test("validate array valid values", async () => {
  const type = NArray.create({ ...config });
  expect(type.type).toBe("array");

  type.setValue([1, 2, 3]);

  await type.validate();

  expect(type.data).toEqual([1, 2, 3]);
  expect(type.valid).toBe(true);
});

test("validate array invalid values", async () => {
  const type = NArray.create({ ...config });
  expect(type.type).toBe("array");

  type.setValue([1, "2", 3, false]);

  await type.validate();

  expect(type.data).toEqual([1, "2", 3, false]);
  expect(type.valid).toBe(false);
  expect(toJS(type.elements[1].errors!)).toEqual(["Value is not a number"]);
  expect(toJS(type.elements[3].errors!)).toEqual(["Value is not a number"]);
});

test("validate array invalid values with range", async () => {
  const type = NArray.create({
    ...config,
    items: { type: "number", maximum: 5 }
  });
  expect(type.type).toBe("array");

  type.setValue([1, 4, 6]);

  await type.validate();

  expect(type.data).toEqual([1, 4, 6]);
  expect(type.valid).toBe(false);
  expect(toJS(type.elements[2].errors!)).toEqual([
    "should NOT be greater than 5"
  ]);
});

test("validate tuple valid values", async () => {
  const type = NArray.create({
    items: [
      { type: "number", maximum: 5, minimum: 2 },
      { type: "string", maxLength: 10 },
      {
        enum: ["NW", "NE", "SW", "SE"],
        type: "string"
      }
    ],
    type: "array"
  });
  expect(type.type).toBe("array");

  type.setValue([3, "naguvan", "NW"]);

  await type.validate();

  expect(type.data).toEqual([3, "naguvan", "NW"]);
  expect(type.valid).toBe(true);
  expect(toJS(type.errors!)).toEqual([]);
});

test("validate tuple invalid values", async () => {
  const type = NArray.create({
    items: [
      { type: "number", maximum: 5, minimum: 2 },
      { type: "string", maxLength: 5 },
      {
        enum: ["NW", "NE", "SW", "SE"],
        type: "string"
      }
    ],
    type: "array"
  });
  expect(type.type).toBe("array");

  type.setValue([7, "naguvan", "EF"]);

  await type.validate();

  expect(type.data).toEqual([7, "naguvan", "EF"]);
  expect(type.valid).toBe(false);
  expect(toJS(type.errors!)).toEqual([]);

  expect(toJS(type.elements[0].errors!)).toEqual([
    "should NOT be greater than 5"
  ]);
  expect(toJS(type.elements[1].errors!)).toEqual([
    "should NOT be longer than 5 characters"
  ]);
  expect(toJS(type.elements[2].errors!)).toEqual([
    "should be equal to one of the allowed values [NW, NE, SW, SE]"
  ]);
});

test("validate tuple invalid values", async () => {
  const type = NArray.create({
    items: [
      { type: "number", maximum: 5, minimum: 2 },
      { type: "string", maxLength: 5 },
      {
        enum: ["NW", "NE", "SW", "SE"],
        type: "string"
      }
    ],
    type: "array"
  });
  expect(type.type).toBe("array");

  type.setValue([7, "naguvan", "EF"]);

  await type.validate();

  expect(type.data).toEqual([7, "naguvan", "EF"]);
  expect(type.valid).toBe(false);
  expect(toJS(type.errors!)).toEqual([]);

  expect(toJS(type.elements[0].errors!)).toEqual([
    "should NOT be greater than 5"
  ]);
  expect(toJS(type.elements[1].errors!)).toEqual([
    "should NOT be longer than 5 characters"
  ]);
  expect(toJS(type.elements[2].errors!)).toEqual([
    "should be equal to one of the allowed values [NW, NE, SW, SE]"
  ]);
});

test("validate tuple valid few items", async () => {
  const type = NArray.create({
    items: [
      { type: "number", maximum: 5, minimum: 2 },
      { type: "string", maxLength: 7 },
      {
        enum: ["NW", "NE", "SW", "SE"],
        type: "string"
      }
    ],
    type: "array"
  });
  expect(type.type).toBe("array");

  type.setValue([3, "naguvan"]);

  await type.validate();

  expect(type.data).toEqual([3, "naguvan", null]);
  expect(type.valid).toBe(false);
  expect(toJS(type.errors!)).toEqual([]);

  expect(toJS(type.elements[0].errors!)).toEqual([]);
  expect(toJS(type.elements[1].errors!)).toEqual([]);
  // expect(toJS(type.elements[2].errors!)).toEqual([
  //     'should be equal to one of the allowed values [NW, NE, SW, SE]'
  // ]);
  expect(toJS(type.elements[2].errors!)).toEqual(["Value is not a string"]);
});

test("validate tuple valid more items", async () => {
  const type = NArray.create({
    items: [
      { type: "number", maximum: 5, minimum: 2 },
      { type: "string", maxLength: 7 },
      {
        enum: ["NW", "NE", "SW", "SE"],
        type: "string"
      }
    ],
    type: "array"
  });
  expect(type.type).toBe("array");

  type.setValue([3, "naguvan", "NE", "extra"]);

  await type.validate();

  expect(type.data).toEqual([3, "naguvan", "NE", "extra"]);
  expect(type.valid).toBe(true);
  expect(toJS(type.errors!)).toEqual([]);

  expect(toJS(type.elements[0].errors!)).toEqual([]);
  expect(toJS(type.elements[1].errors!)).toEqual([]);
  expect(toJS(type.elements[2].errors!)).toEqual([]);
});

test("validate tuple valid not allowing additional items", async () => {
  const type = NArray.create({
    additionalItems: false,
    items: [
      { type: "number", maximum: 5, minimum: 2 },
      { type: "string", maxLength: 7 },
      {
        enum: ["NW", "NE", "SW", "SE"],
        type: "string"
      }
    ],

    type: "array"
  });
  expect(type.type).toBe("array");

  type.setValue([3, "naguvan", "NE", "extra"]);

  await type.validate();

  expect(type.data).toEqual([3, "naguvan", "NE", "extra"]);
  expect(type.valid).toBe(false);
  expect(toJS(type.errors!)).toEqual(["should NOT have additional items"]);
});

test("validate min items", async () => {
  const type = NArray.create({
    minItems: 5,
    type: "array"
  });
  expect(type.type).toBe("array");

  type.setValue([3, "naguvan", "NE", "extra"]);

  await type.validate();

  expect(type.data).toEqual([3, "naguvan", "NE", "extra"]);
  expect(type.valid).toBe(false);
  expect(toJS(type.errors!)).toEqual(["should NOT have less than 5 items"]);
});

test("validate max items", async () => {
  const type = NArray.create({
    maxItems: 3,
    type: "array"
  });
  expect(type.type).toBe("array");

  type.setValue([3, "naguvan", "NE", "extra"]);

  await type.validate();

  expect(type.data).toEqual([3, "naguvan", "NE", "extra"]);
  expect(type.valid).toBe(false);
  expect(toJS(type.errors!)).toEqual(["should NOT have more than 3 items"]);
});

test("validate unique items", async () => {
  const type = NArray.create({
    type: "array",
    uniqueItems: true
  });
  expect(type.type).toBe("array");

  type.setValue([3, "naguvan", 3, "NE", "NE", "extra"]);

  await type.validate();

  expect(type.data).toEqual([3, "naguvan", 3, "NE", "NE", "extra"]);
  expect(type.valid).toBe(false);
  expect(toJS(type.errors!)).toEqual(["should NOT have duplicate items"]);
});

test("validate value types", async () => {
  const type = NArray.create({
    items: {
      type: "number"
    },
    title: "Array",
    type: "array",
    value: [1, 2, 3]
  });
  expect(type.type).toBe("array");

  type.setValue([1, 2, 3]);

  await type.validate();

  expect(type.data).toEqual([1, 2, 3]);
  expect(type.valid).toBe(true);

  expect(type.elements.length).toBe(3);
});
