import { Null } from "./Null";

test("create null type", () => {
  const type = Null.create({
    title: "naguvan",
    value: null,
    type: "null"
  });
  expect(type.type).toBe("null");
  expect(type.title).toBe("naguvan");
  expect(type.value).toBe(null);
});

test("change null name type", () => {
  const type = Null.create({
    title: "naguvan",
    value: null,
    type: "null"
  });
  type.setName("skclusive");
  expect(type.name).toBe("skclusive");
});
