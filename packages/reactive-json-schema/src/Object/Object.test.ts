// tslint:disable:max-file-line-count

import { createObject } from "./Object";

import { IObject, IObjectConfig } from "./Object";

import { toJS } from "mobx";
import { keys } from "../utils";

const config: IObjectConfig = {
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
};

const NObject = createObject();

test("create object type", () => {
  const type = NObject.create(config);
  expect(type.type).toBe("object");
  expect(type.title).toBe("naguvan");
  expect(type.data).toEqual({ age: 1, name: "naguvan" });
  expect(type.additionalProperties).toBeNull();
  expect(type.maxProperties).toBeNull();
  expect(type.minProperties).toBeNull();

  expect(type.properties).not.toBeNull();
  expect(keys(toJS(type.properties!)).length).toBe(2);
  expect(keys(toJS(type.properties!))).toEqual(["age", "name"]);

  expect(type.properties!.get("name")!.title).toBe("name");
  expect(type.properties!.get("name")!.data).toBe("naguvan");
  expect(type.properties!.get("name")!.type).toBe("string");

  expect(type.properties!.get("age")!.title).toBe("age");
  expect(type.properties!.get("age")!.data).toBe(1);
  expect(type.properties!.get("age")!.type).toBe("number");

  // console.info(getSnapshot(type));
  // console.info(getSnapshot(city));
});

test("nested object type", () => {
  const type = NObject.create({
    properties: {
      city: {
        properties: {
          name: {
            title: "name",
            type: "string",
            value: "chennai"
          }
        },
        title: "city",
        type: "object"
      }
    },
    title: "naguvan",
    type: "object"
  });

  const city: IObject = type.properties!.get("city")! as IObject;
  expect(city).not.toBeNull();
  expect(city.title).toBe("city");
  expect(city.properties!.get("name")!.title).toBe("name");
  expect(city.properties!.get("name")!.data).toBe("chennai");
  expect(city.properties!.get("name")!.type).toBe("string");
});

test("validate config object value", async () => {
  const type = NObject.create({ ...config });
  expect(type.data).toEqual({ age: 1, name: "naguvan" });
});

test("test invalid minProperties configuration", () => {
  expect(() =>
    NObject.create({
      ...config,
      minProperties: -10
    })
  ).toThrowError(`minProperties can not be negative`);
});

test("test invalid maxProperties configuration", () => {
  expect(() =>
    NObject.create({
      ...config,
      maxProperties: -10
    })
  ).toThrowError(`maxProperties can not be negative`);
});

test("test duplicate required properties configuration", () => {
  expect(() =>
    NObject.create({
      ...config,
      required: ["name", "age", "name"]
    })
  ).toThrowError(`required should not have duplicate properties`);
});

test("validate minProperties valid", async () => {
  const type = NObject.create({ ...config, minProperties: 2 });

  type.setValue({ name: "naguvan", age: 1 });
  expect(type.data).toEqual({ name: "naguvan", age: 1 });

  await type.validate();

  expect(type.valid).toBe(true);
  expect(type.errors!.slice(0)).toEqual([]);
});

test("validate minProperties invalid", async () => {
  const type = NObject.create({ ...config, minProperties: 2 });

  type.setValue({ name: "naguvan" });
  expect(type.data).toEqual({ name: "naguvan", age: 1 });

  await type.validate();

  expect(type.valid).toBe(false);
  expect(type.errors!.slice(0)).toEqual([
    "should NOT have less than 2 properties"
  ]);
});

test("validate maxProperties valid", async () => {
  const type = NObject.create({ ...config, maxProperties: 1 });

  type.setValue({ name: "naguvan" });
  expect(type.data).toEqual({ name: "naguvan", age: 1 });

  await type.validate();

  expect(type.valid).toBe(true);
  expect(type.errors!.slice(0)).toEqual([]);
});

test("validate maxProperties invalid", async () => {
  const type = NObject.create({ ...config, maxProperties: 1 });

  type.setValue({ name: "naguvan", age: 1 });
  expect(type.data).toEqual({ name: "naguvan", age: 1 });

  await type.validate();

  expect(type.valid).toBe(false);
  expect(type.errors!.slice(0)).toEqual([
    "should NOT have more than 1 properties"
  ]);
});

test("validate required valid", async () => {
  const type = NObject.create({
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

    required: ["name", "age"],
    title: "naguvan",

    type: "object"
  });

  type.setValue({ name: "naguvan", age: 3 });
  expect(type.data).toEqual({ name: "naguvan", age: 3 });

  await type.validate();

  expect(type.valid).toBe(true);
  expect(type.errors!.slice(0)).toEqual([]);
});

test("validate missing required properties", async () => {
  const type = NObject.create({
    properties: {
      age: {
        title: "age",
        type: "number"
      },
      name: {
        title: "name",
        type: "string",
        value: "naguvan"
      }
    },
    required: ["name", "age"],
    title: "naguvan",
    type: "object"
  });

  type.setValue({ name: "naguvan" });
  expect(toJS(type.value)).toEqual({ name: "naguvan" });

  await type.validate();

  expect(type.valid).toBe(false);
  expect(type.errors!.slice(0)).toEqual([]);
  expect(type.getProperty("age")!.errors!.slice(0)).toEqual([
    "Field is required"
  ]);
});

test("validate allowing additionalProperties", async () => {
  const type = NObject.create({ ...config, additionalProperties: true });

  type.setValue({
    age: 1,
    city: "chennai",
    country: "india",
    name: "naguvan"
  });
  expect(type.data).toEqual({
    age: 1,
    city: "chennai",
    country: "india",
    name: "naguvan"
  });

  await type.validate();

  expect(type.valid).toBe(true);
  expect(type.errors!.slice(0)).toEqual([]);
});

test("validate not allowing additionalProperties", async () => {
  const type = NObject.create({ ...config, additionalProperties: false });

  type.setValue({
    age: 1,
    city: "chennai",
    country: "india",
    name: "naguvan"
  });
  expect(type.data).toEqual({
    age: 1,
    city: "chennai",
    country: "india",
    name: "naguvan"
  });

  await type.validate();

  expect(type.valid).toBe(false);
  expect(type.errors!.slice(0)).toEqual([
    `should NOT have additional properties [city, country]`
  ]);
});

test("validate additionalProperties allowed types", async () => {
  const type = NObject.create({
    ...config,
    additionalProperties: { type: "string" }
  });

  type.setValue({
    age: 1,
    city: "chennai",
    country: "india",
    name: "naguvan"
  });
  expect(type.data).toEqual({
    age: 1,
    city: "chennai",
    country: "india",
    name: "naguvan"
  });

  await type.validate();

  expect(type.valid).toBe(true);
  expect(type.errors!.slice(0)).toEqual([]);
});

test("validate additionalProperties not allowed types", async () => {
  const type = NObject.create({
    ...config,
    additionalProperties: { type: "number" }
  });

  type.setValue({
    age: 1,
    city: "chennai",
    country: "india",
    name: "naguvan"
  });
  expect(type.data).toEqual({
    age: 1,
    city: "chennai",
    country: "india",
    name: "naguvan"
  });

  await type.validate();

  expect(type.valid).toBe(false);
  expect(type.errors!.slice(0)).toEqual([
    `additional property 'city' is not a number`,
    `additional property 'country' is not a number`
  ]);
});

test("validate additionalProperties allowed types with valid format", async () => {
  const type = NObject.create({
    ...config,
    additionalProperties: { type: "string", format: "email" }
  });

  type.setValue({
    age: 1,
    contact: "naguvan@sk.com",
    name: "naguvan"
  });
  expect(type.data).toEqual({
    age: 1,
    contact: "naguvan@sk.com",
    name: "naguvan"
  });

  await type.validate();

  expect(type.valid).toBe(true);
  expect(type.errors!.slice(0)).toEqual([]);
});

test("get configured property", async () => {
  const type = NObject.create({
    ...config,
    additionalProperties: { type: "string", format: "email" }
  });

  type.setValue({
    age: 2,
    contact: "naguvan0sk.com",
    name: "naguvan"
  });

  expect(type.getProperty("name")).not.toBeUndefined();
  expect(type.getProperty("age")).not.toBeUndefined();
  expect(type.getProperty("contact")).toBeUndefined();

  expect(type.getProperty("name")!.data).toBe("naguvan");
  expect(type.getProperty("age")!.data).toBe(2);
});

test("get configured property data", async () => {
  const type = NObject.create({
    ...config,
    additionalProperties: { type: "string", format: "email" }
  });

  expect(type.getProperty("name")!.data).toBe("naguvan");
  expect(type.getProperty("age")!.data).toBe(1);

  type.setValue({
    age: 32,
    contact: "naguvan0sk.com",
    name: "skclusive"
  });

  expect(type.getProperty("name")!.data).toBe("skclusive");
  expect(type.getProperty("age")!.data).toBe(32);
});

test("get configured property data", async () => {
  const type = NObject.create({
    properties: {
      age: {
        maximum: 15,
        minimum: 5,
        title: "age",
        type: "number",
        value: 1
      },
      name: {
        minLength: 5,
        title: "name",
        type: "string",
        value: "naguvan"
      }
    },
    title: "naguvan",
    type: "object"
  });

  expect(type.getProperty("name")!.data).toBe("naguvan");
  expect(type.getProperty("age")!.data).toBe(1);

  expect(type.getProperty("name")!.valid).toBe(true);
  expect(type.getProperty("age")!.valid).toBe(true);

  type.setValue({
    age: 32,
    name: "sk"
  });

  expect(type.getProperty("name")!.data).toBe("sk");
  expect(type.getProperty("age")!.data).toBe(32);

  await type.validate();

  expect(type.getProperty("name")!.valid).toBe(false);
  expect(type.getProperty("age")!.valid).toBe(false);
});

test("nested object type validation", async () => {
  const type = NObject.create({
    properties: {
      city: {
        properties: {
          name: {
            maxLength: 7,
            title: "name",
            type: "string",
            value: "madurai"
          }
        },
        title: "city",
        type: "object"
      }
    },
    title: "naguvan",
    type: "object"
  });

  const city: IObject = type.properties!.get("city")! as IObject;
  expect(city).not.toBeNull();
  expect(city.title).toBe("city");

  type.setValue({ city: { name: "manamadurai" } });

  await type.validate();

  expect(type.valid).toBe(false);

  expect(city.properties!.get("name")!.data).toBe("manamadurai");
  expect(city.properties!.get("name")!.valid).toBe(false);
  expect(toJS(city.properties!.get("name")!.errors)).toEqual([
    "should NOT be longer than 7 characters"
  ]);
});

test("nested object type modification and validation", async () => {
  const type = NObject.create({
    properties: {
      city: {
        properties: {
          name: {
            maxLength: 7,
            title: "name",
            type: "string",
            value: "madurai"
          }
        },
        title: "city",
        type: "object"
      }
    },
    title: "naguvan",
    type: "object"
  });

  const city: IObject = type.properties!.get("city")! as IObject;
  expect(city).not.toBeNull();
  expect(city.title).toBe("city");

  await city.sync({ name: "manamadurai" });

  // await type.validate();

  expect(city.properties!.get("name")!.data).toBe("manamadurai");
  expect(city.properties!.get("name")!.valid).toBe(false);
  expect(toJS(city.properties!.get("name")!.errors)).toEqual([
    "should NOT be longer than 7 characters"
  ]);
});
