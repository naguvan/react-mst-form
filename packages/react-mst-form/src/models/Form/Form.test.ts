// tslint:disable:object-literal-sort-keys

import Form, { IFormConfig } from "./Form";

import {
  IBooleanConfig,
  INumberConfig,
  IString,
  IStringConfig
} from "reactive-json-schema";

import { Boolean, Number, String } from "reactive-json-schema";

describe("testing form", () => {
  const name: IStringConfig = {
    meta: {
      value: "sk"
    },
    minLength: 5,
    title: "Name",
    type: "string"
  };

  const age: INumberConfig = {
    maximum: 10,
    meta: {
      value: 1
    },
    minimum: 0,
    title: "Age",
    type: "number"
  };

  const boy: IBooleanConfig = {
    meta: {
      value: true
    },
    title: "Boy?",
    type: "boolean"
  };

  test("create form", () => {
    const form = Form.create({
      layout: ["name", "age", ["boy"]],
      schema: {
        properties: {
          age,
          boy,
          name
        },
        type: "object"
      },
      sections: [{ title: "Basic", layout: ["name", "age"] }],
      title: "Test Form"
    });

    // console.info(getSnapshot(form));

    expect(form.title).toBe("Test Form");
    expect(form.errors.length).toBe(0);
    expect(form.valid).toBe(true);
    expect(form.modified).toBe(false);
    expect(form.validating).toBe(false);

    expect(form.get("name")!.meta.value).toBe("sk");
    expect(form.get("name")!.meta.name).toBe("name");
    expect(String.is(form.get("name"))).toBe(true);

    expect(form.get("age")!.meta.value).toBe(1);
    expect(form.get("age")!.meta.name).toBe("age");
    expect(Number.is(form.get("age"))).toBe(true);

    expect(form.get("boy")!.meta.value).toBe(true);
    expect(form.get("boy")!.meta.name).toBe("boy");
    expect(Boolean.is(form.get("boy"))).toBe(true);

    expect(form.fields.length).toBe(3);
    expect(form.values).toEqual({ name: "sk", age: 1, boy: true });

    expect(form.layout).toEqual(["name", "age", ["boy"]]);

    expect(form.layout).toContain("age");

    expect(form.sections.length).toBe(1);
    expect(form.sections[0].title).toBe("Basic");
    expect(form.sections[0].layout).toEqual(["name", "age"]);
  });

  test("test form layout single mis-configuration error", () => {
    expect(() =>
      Form.create({
        layout: ["name", "age"],
        schema: {
          properties: {
            name
          },
          type: "object"
        },
        title: "Test Form"
      })
    ).toThrowError(`['age'] layout field is not configured.`);
  });

  test("test form layout multi mis-configuration error", () => {
    expect(() =>
      Form.create({
        layout: ["name", "age", ["boy"]],
        schema: {
          properties: {
            a: age,
            b: boy,
            name
          },
          type: "object"
        },
        title: "Test Form"
      })
    ).toThrowError(`['age', 'boy'] layout fields are not configured.`);
  });

  test("test field modification", () => {
    const form = Form.create({
      layout: ["name"],
      schema: {
        properties: {
          name
        },
        type: "object"
      },
      title: "Test Form"
    });

    expect(form.title).toBe("Test Form");
    expect(form.modified).toBe(false);
    expect(form.values).toEqual({ name: "sk" });

    const fname = form.get("name") as IString;
    fname!.setValue("senthilnathan");

    expect(form.modified).toBe(true);
    expect(form.values).toEqual({ name: "senthilnathan" });

    fname!.reset();
    expect(form.modified).toBe(false);
    expect(form.values).toEqual({ name: "sk" });
  });

  test("test field error", () => {
    const form = Form.create({
      layout: ["name"],
      schema: {
        properties: {
          name
        },
        type: "object"
      },
      title: "Test Form"
    });

    expect(form.title).toBe("Test Form");
    expect(form.valid).toBe(true);
    expect(form.fieldErrors).toEqual({ errors: [], properties: { name: [] } });

    const fname = form.get("name") as IString;
    fname!.addError("testing field error");

    expect(form.valid).toBe(false);
    expect(form.fieldErrors).toEqual({
      errors: [],
      properties: { name: ["testing field error"] }
    });

    fname!.reset();
    expect(form.valid).toBe(true);
    expect(form.fieldErrors).toEqual({ errors: [], properties: { name: [] } });
  });

  test("test field validating", async () => {
    const form = Form.create({
      layout: ["name"],
      schema: {
        properties: {
          name
        },
        type: "object"
      },
      title: "Test Form"
    });

    expect(form.title).toBe("Test Form");
    expect(form.validating).toBe(false);

    const fname = form.get("name") as IString;

    const validate = fname.validate();
    expect(form.validating).toBe(true);

    await validate;
    expect(form.validating).toBe(false);
  });

  test("form schema test", () => {
    const config: IFormConfig = {
      title: "Test Form",
      cancel: "Cancel",
      submit: "create",
      schema: {
        type: "object",
        properties: {
          name: {
            type: "object",
            properties: {
              first: {
                meta: {
                  sequence: 1,
                  value: "naguvan"
                },
                type: "string",
                title: "First",
                minLength: 5
              },
              middle: {
                meta: {
                  sequence: 1,
                  value: "sk"
                },
                type: "string",
                title: "Middle",
                minLength: 5
              },
              last: {
                meta: {
                  sequence: 2,
                  value: "sk"
                },
                type: "string",
                title: "Last",
                minLength: 5
              },
              age: {
                meta: {
                  sequence: 2,
                  value: 5
                },
                type: "number",
                title: "Age",
                maximum: 10,
                minimum: 3
              }
            } // ,
            // layout: [["first", "last"], "middle", "age"]
          },
          birthdate: {
            format: "date",
            meta: {
              component: "date"
            },
            type: "string",
            title: "Birth date"
          },
          ipv4: {
            type: "string",
            title: "ipv4",
            minLength: 5,
            maxLength: 20,
            format: "ipv4"
          },
          color: {
            meta: {
              component: "color"
            },
            type: "string",
            title: "In which color",
            format: "color"
          },
          size: {
            meta: {
              value: 5
            },
            type: "number",
            title: "Size",
            maximum: 10,
            minimum: 3,
            multipleOf: 3
          },
          type: {
            meta: {
              options: [{ label: "One", value: 1 }, { label: "Two", value: 2 }],
              value: 5
            },
            type: "number",
            title: "Select a type",
            enum: [1, 2]
          },
          agree: {
            meta: {
              value: false
            },
            type: "boolean",
            title: "I agree with your terms",
            const: true
          },
          array: {
            type: "array",
            title: "Array",
            items: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                  title: "name",
                  minLength: 3
                },
                age: {
                  meta: {
                    value: 0
                  },
                  type: "number",
                  title: "age",
                  multipleOf: 2,
                  minimum: 2
                }
              }
            },
            minItems: 2,
            maxItems: 4
          }
        }
      },
      sections: [
        {
          title: "Basic",
          layout: ["name", "birthdate", ["size", "color"]]
        },
        {
          title: "Others",
          layout: ["ipv4", "type", "agree", "array"]
        }
      ]
    };

    const form = Form.create(config);

    expect(form.title).toBe("Test Form");
  });
});
