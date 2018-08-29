import { types } from "mobx-state-tree";
import { IValueConfig } from "../../../types";
import { create } from "./Value";

const config: IValueConfig<number, "number"> = {
  title: "naguvan",
  value: 10,
  type: "number"
};

const Value = create<number, "number">("number", types.number, 0);

test("create type type", () => {
  const type = Value.create(config);
  expect(type.type).toBe("number");
  expect(type.title).toBe("naguvan");
  expect(type.name).toBe(type.title);
  expect(type.value).toBe(10);
  expect(type.initial).toBe(10);
  expect(type.modified).toBe(false);

  expect(type.mandatory).toBe(false);
  expect(type.disabled).toBe(false);
  expect(type.visible).toBe(true);
  expect(type.validating).toBe(false);
  expect(type.errors!.length).toBe(0);
});

test("change type value", () => {
  const type = Value.create({ ...config, value: 20 });

  expect(type.value).toBe(20);
  expect(type.initial).toBe(20);
  expect(type.modified).toBe(false);

  type.setValue(30);
  expect(type.value).toBe(30);
  expect(type.initial).toBe(20);
  expect(type.modified).toBe(true);

  type.reset();
  expect(type.value).toBe(20);
  expect(type.modified).toBe(false);
});

test("change type name", () => {
  const type = Value.create(config);

  type.setName("skclusive");
  expect(type.name).toBe("skclusive");
});

test("change mandatory property", () => {
  const type = Value.create(config);

  expect(type.mandatory).toBe(false);

  type.setMandatory(true);
  expect(type.mandatory).toBe(true);
});

test("change disabled property", () => {
  const type = Value.create({ ...config, disabled: true });

  expect(type.disabled).toBe(true);

  type.setDisabled(false);
  expect(type.disabled).toBe(false);
});

test("change visible property", () => {
  const type = Value.create({ ...config, visible: false });

  expect(type.visible).toBe(false);

  type.setDisabled(false);
  expect(type.visible).toBe(false);

  type.setVisible(true);
  expect(type.visible).toBe(true);
});

test("change error property", () => {
  const type = Value.create(config);

  expect(type.errors!.length).toBe(0);
  expect(type.valid).toBe(true);

  type.addError("this type has some error");
  expect(type.errors!.slice(0)).toEqual(["this type has some error"]);
  expect(type.valid).toBe(false);

  type.reset();
  expect(type.errors!.length).toBe(0);
  expect(type.valid).toBe(true);
});

test("check validating property", async () => {
  const type = Value.create(config);

  expect(type.validating).toBe(false);

  const validate = type.validate();
  expect(type.validating).toBe(true);

  await validate;
  expect(type.validating).toBe(false);
});

test("validate const valid", async () => {
  const type = Value.create({ ...config, const: 5 });

  type.setValue(5);
  expect(type.value).toBe(5);

  await type.validate();

  expect(type.valid).toBe(true);
  expect(type.errors!.slice(0)).toEqual([]);
});

test("validate const invalid", async () => {
  const type = Value.create({ ...config, const: 5 });

  type.setValue(10);
  expect(type.value).toBe(10);

  await type.validate();

  expect(type.valid).toBe(false);
  expect(type.errors!.slice(0)).toEqual(["should be equal to 5"]);
});

test("validate enum valid", async () => {
  const type = Value.create({ ...config, enum: [5, 10] });

  type.setValue(5);
  expect(type.value).toBe(5);

  await type.validate();

  expect(type.valid).toBe(true);
  expect(type.errors!.slice(0)).toEqual([]);
});

test("validate enum invalid", async () => {
  const type = Value.create({ ...config, enum: [5, 20] });

  type.setValue(10);
  expect(type.value).toBe(10);

  await type.validate();

  expect(type.valid).toBe(false);
  expect(type.errors!.slice(0)).toEqual([
    "should be equal to one of the allowed values [5, 20]"
  ]);
});
