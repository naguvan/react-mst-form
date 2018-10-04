import { IStringConfig, String } from "./String";

const config: IStringConfig = {
  maxLength: 6,
  minLength: 4,
  title: "naguvan",
  type: "string",
  value: "sk.sk"
};

test("create string type", () => {
  const type = String.create(config);

  expect(type.type).toBe("string");
  expect(type.title).toBe("naguvan");
  expect(type.data).toBe("sk.sk");
  expect(type.minLength).toBe(4);
});

test("change string value", () => {
  const type = String.create(config);

  type.setValue("rust");
  expect(type.data).toBe("rust");
});

test("validate minLength valid", async () => {
  const type = String.create(config);

  type.setValue("java");
  expect(type.data).toBe("java");

  await type.validate();

  expect(type.valid).toBe(true);
  expect(type.errors!.slice(0)).toEqual([]);
});

test("validate minLength invalid", async () => {
  const type = String.create(config);

  type.setValue("js");
  expect(type.data).toBe("js");

  await type.validate();

  expect(type.valid).toBe(false);
  expect(type.errors!.slice(0)).toEqual([
    "should NOT be shorter than 4 characters"
  ]);
});

test("validate maxLength valid", async () => {
  const type = String.create(config);

  type.setValue("java");
  expect(type.data).toBe("java");

  await type.validate();

  expect(type.valid).toBe(true);
  expect(type.errors!.slice(0)).toEqual([]);
});

test("validate maxLength invalid", async () => {
  const type = String.create(config);

  type.setValue("typescript");
  expect(type.data).toBe("typescript");

  await type.validate();

  expect(type.valid).toBe(false);
  expect(type.errors!.slice(0)).toEqual([
    "should NOT be longer than 6 characters"
  ]);
});

test("test invalid pattern configuration", () => {
  expect(() =>
    String.create({
      ...config,
      pattern: "$%#%^%"
    })
  ).toThrowError(`pattern '$%#%^%' is invalid.`);
});

test("test valid pattern", async () => {
  const type = String.create({
    ...config,
    maxLength: 8,
    minLength: 8,
    pattern: "/^(2[0-4]|[01][0-9]):([0-5][0-9]):(60|[0-5][0-9])$/"
  });

  type.setValue("23:05:56");
  expect(type.data).toBe("23:05:56");

  await type.validate();

  expect(type.valid).toBe(true);
  expect(type.errors!.slice(0)).toEqual([]);
});

test("test invalid pattern", async () => {
  const type = String.create({
    ...config,
    maxLength: 8,
    minLength: 8,
    pattern: "/^(2[0-4]|[01][0-9]):([0-5][0-9]):(60|[0-5][0-9])$/"
  });

  type.setValue("26:25:56");
  expect(type.data).toBe("26:25:56");

  await type.validate();

  expect(type.valid).toBe(false);
  expect(type.errors!.slice(0)).toEqual([
    "should match pattern /^(2[0-4]|[01][0-9]):([0-5][0-9]):(60|[0-5][0-9])$/"
  ]);
});
