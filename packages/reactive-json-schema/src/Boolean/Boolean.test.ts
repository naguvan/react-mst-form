import { Boolean } from "./Boolean";

test("create boolean type", () => {
  const type = Boolean.create({
    title: "naguvan",
    type: "boolean",
    value: true
  });
  expect(type.type).toBe("boolean");
  expect(type.title).toBe("naguvan");
  expect(type.data).toBe(true);
});

test("change boolean name type", () => {
  const type = Boolean.create({
    title: "naguvan",
    type: "boolean",
    value: true
  });
  type.setName("senthilnathan");
  expect(type.name).toBe("senthilnathan");
});
