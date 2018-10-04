import { INumberConfig, Number } from "./Number";

const config: INumberConfig = {
  title: "naguvan",
  type: "number",
  value: 50
};

test("create number type", () => {
  const type = Number.create(config);
  expect(type.type).toBe("number");
  expect(type.title).toBe("naguvan");
  expect(type.data).toBe(50);
  expect(type.minimum).toBe(null);
  expect(type.maximum).toBe(null);
});

test("change number name type", () => {
  const type = Number.create(config);
  type.setName("senthilnathan");
  expect(type.name).toBe("senthilnathan");
});

test("validate minimum valid", async () => {
  const type = Number.create({ ...config, minimum: 10 });

  type.setValue(12);
  expect(type.data).toBe(12);

  await type.validate();

  // expect(type.valid).toBe(true);
  expect(type.errors!.slice(0)).toEqual([]);
});

test("validate minimum invalid", async () => {
  const type = Number.create({ ...config, minimum: 10 });

  type.setValue(5);
  expect(type.data).toBe(5);

  await type.validate();

  expect(type.valid).toBe(false);
  expect(type.errors!.slice(0)).toEqual(["should NOT be lesser than 10"]);
});

test("validate maximum valid", async () => {
  const type = Number.create({ ...config, maximum: 10 });

  type.setValue(5);
  expect(type.data).toBe(5);

  await type.validate();

  expect(type.valid).toBe(true);
  expect(type.errors!.slice(0)).toEqual([]);
});

test("validate maximum invalid", async () => {
  const type = Number.create({ ...config, maximum: 10 });

  type.setValue(15);
  expect(type.data).toBe(15);

  await type.validate();

  expect(type.valid).toBe(false);
  expect(type.errors!.slice(0)).toEqual(["should NOT be greater than 10"]);
});

test("test invalid multipleOf configuration", () => {
  expect(() =>
    Number.create({
      ...config,
      multipleOf: 0
    })
  ).toThrowError(`multipleOf can not be zero`);

  expect(() =>
    Number.create({
      ...config,
      multipleOf: -10
    })
  ).toThrowError(`multipleOf can not be negative`);
});

test("validate multipleOf valid", async () => {
  const type = Number.create({ ...config, multipleOf: 3 });

  type.setValue(27);
  expect(type.data).toBe(27);

  await type.validate();

  expect(type.valid).toBe(true);
  expect(type.errors!.slice(0)).toEqual([]);
});

test("validate multipleOf invalid", async () => {
  const type = Number.create({ ...config, multipleOf: 3 });

  type.setValue(29);
  expect(type.data).toBe(29);

  await type.validate();

  expect(type.valid).toBe(false);
  expect(type.errors!.slice(0)).toEqual(["should be multiple of 3"]);
});

test("validate const valid", async () => {
  const type = Number.create({ ...config, const: 5 });

  type.setValue(5);
  expect(type.data).toBe(5);

  await type.validate();

  expect(type.valid).toBe(true);
  expect(type.errors!.slice(0)).toEqual([]);
});

test("validate const invalid", async () => {
  const type = Number.create({ ...config, const: 5 });

  type.setValue(10);
  expect(type.data).toBe(10);

  await type.validate();

  expect(type.valid).toBe(false);
  expect(type.errors!.slice(0)).toEqual(["should be equal to 5"]);
});

test("validate enum valid", async () => {
  const type = Number.create({ ...config, enum: [5, 10] });

  type.setValue(5);
  expect(type.data).toBe(5);

  await type.validate();

  expect(type.valid).toBe(true);
  expect(type.errors!.slice(0)).toEqual([]);
});

test("validate enum invalid", async () => {
  const type = Number.create({ ...config, enum: [5, 20] });

  type.setValue(10);
  expect(type.data).toBe(10);

  await type.validate();

  expect(type.valid).toBe(false);
  expect(type.errors!.slice(0)).toEqual([
    "should be equal to one of the allowed values [5, 20]"
  ]);
});
