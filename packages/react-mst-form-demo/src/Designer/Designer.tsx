// tslint:disable:max-file-line-count

// tslint:disable:object-literal-sort-keys

// tslint:disable:no-console

import * as React from "react";
import { Component, ReactNode } from "react";

import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { CSSProperties, WithStyles } from "@material-ui/core/styles/withStyles";
import withStyles from "@material-ui/core/styles/withStyles";

import classNames from "classnames";
import Layout from "react-flow-layout";
import { IFormConfig, IMetaConfig, ISchemaConfig } from "react-mst-form";

import Editor from "../Editor";
import Form from "../Form";

export interface IDesignerStyles {
  root: CSSProperties;
  action: CSSProperties;
  container: CSSProperties;
  designer: CSSProperties;
  schema: CSSProperties;
  formItem: CSSProperties;
  form: CSSProperties;
  stretch: CSSProperties;
}

export interface IDesignerStyleProps
  extends WithStyles<keyof IDesignerStyles> {}

export interface IDesignerProps {
  style?: CSSProperties;
  className?: string;
}

export interface IDesignerStates {
  width: string;
  height: string;
  meta: string;
  schema: string;
  config: string;
  snapshot: string;
  open: boolean;
  form: {
    schema?: ISchemaConfig;
    config?: IFormConfig;
    snapshot?: {};
    meta?: IMetaConfig;
  };
}

const schema: ISchemaConfig = {
  type: "object",
  properties: {
    name: {
      type: "object",
      properties: {
        first: {
          type: "string",
          title: "First",
          minLength: 5
        },
        middle: {
          type: "string",
          title: "Middle",
          minLength: 5
        },
        last: {
          type: "string",
          title: "Last",
          minLength: 5
        },
        age: {
          type: "number",
          title: "Age",
          maximum: 10,
          minimum: 3
        }
      }
    },
    birthdate: {
      format: "date",
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
      type: "string",
      title: "In which color",
      format: "color"
    },
    size: {
      type: "number",
      title: "Size",
      maximum: 10,
      minimum: 3,
      multipleOf: 3
    },
    type: {
      type: "number",
      title: "Select a type",
      enum: [1, 2, 3]
    },
    agree: {
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
};

const meta: IMetaConfig = {
  type: "object",
  properties: {
    name: {
      layout: [["first", "last"], "middle", "age"],
      type: "object",
      properties: {
        first: {
          sequence: 1,
          icon: "face",
          iconAlign: "start",
          type: "string"
        },
        middle: {
          sequence: 1,
          type: "string"
        },
        last: {
          sequence: 2,
          type: "string"
        },
        age: {
          sequence: 2,
          icon: "build",
          type: "number"
        }
      }
    },
    birthdate: {
      component: "date",
      icon: "date-range",
      iconAlign: "end",
      type: "string"
    },
    color: {
      component: "color",
      type: "string"
    },
    size: {
      component: "range",
      step: 1,
      type: "number"
    },
    type: {
      error: "should not be empty",
      options: [
        { label: "One", value: 1 },
        { label: "Two", value: 2 },
        { label: "Three", value: 3 }
      ],
      type: "number"
    },
    agree: {
      type: "boolean"
    },
    array: {
      type: "array",
      items: {
        properties: {
          age: {
            type: "number"
          }
        },
        type: "object"
      }
    }
  }
};

const config: IFormConfig = {
  title: "Test Form",
  cancel: "Cancel",
  submit: "create",
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

const snapshot = {
  name: {
    first: "naguvan",
    middle: "sk",
    last: "sk",
    age: 1
  },
  birthdate: "2018-10-29",
  size: 5,
  agree: false
};

export class Designer extends Component<
  IDesignerProps & IDesignerStyleProps,
  IDesignerStates
> {
  public state: IDesignerStates = {
    width: "100%",
    height: "100%",
    config: JSON.stringify(config, null, 2),
    open: false,
    meta: JSON.stringify(meta, null, 2),
    schema: JSON.stringify(schema, null, 2),
    snapshot: JSON.stringify(snapshot, null, 2),
    form: {
      config,
      schema,
      meta,
      snapshot
    }
  };

  public render(): ReactNode {
    const { className: clazz, classes, style } = this.props;
    const { width, height, open } = this.state;
    // tslint:disable-next-line:no-shadowed-variable
    const { config, meta, schema, form, snapshot } = this.state;
    const className: string = classNames(classes!.root, clazz);
    return (
      <div {...{ className, style }}>
        <Paper className={classes.root} elevation={3} style={{ padding: 15 }}>
          <Layout
            center={false}
            items={[
              <div className={classes.action}>
                <Button variant="contained" onClick={this.handleClickOpen}>
                  Open Form Dialog
                </Button>
                <Button variant="contained" onClick={this.handleRender}>
                  Render Form
                </Button>
              </div>,
              [
                [
                  [
                    <Editor
                      title="Form Config"
                      value={config}
                      onChange={this.onConfig}
                    />,
                    <Editor
                      title="Schema Config"
                      value={schema}
                      onChange={this.onSchema}
                    />
                  ],
                  [
                    <Editor
                      title="Meta Config"
                      value={meta}
                      onChange={this.onMeta}
                    />,
                    <Editor
                      title="Snapshot"
                      value={snapshot}
                      onChange={this.onSnapshot}
                    />
                  ]
                ],
                <Paper square elevation={3} style={{ width: "100%" }}>
                  <Form
                    className={classes.form}
                    config={form.config as any}
                    schema={form.schema}
                    meta={form.meta}
                    snapshot={form.snapshot}
                    open={open}
                    onClose={this.handleClose}
                  />
                </Paper>
              ]
            ]}
          >
            {(item: ReactNode) => <div className={classes.stretch}>{item}</div>}
          </Layout>
        </Paper>
      </div>
    );
  }

  private getConfig(): IFormConfig | undefined {
    return this.parse(this.state.config);
  }

  private getSchema(): ISchemaConfig | undefined {
    return this.parse(this.state.schema);
  }

  private getMeta(): IMetaConfig | undefined {
    return this.parse(this.state.meta);
  }

  private getSnapshot(): {} | undefined {
    return this.parse(this.state.snapshot);
  }

  private parse<T>(value: string): T | undefined {
    try {
      return JSON.parse(value);
    } catch (e) {
      return undefined;
    }
  }

  private handleClickOpen = () => {
    this.setState({ open: true });
  };

  private handleRender = () => {
    let form = this.state.form;
    // tslint:disable-next-line:no-shadowed-variable
    const config = this.getConfig();
    if (config) {
      form = { ...form, config };
    }
    // tslint:disable-next-line:no-shadowed-variable
    const schema = this.getSchema();
    if (schema) {
      form = { ...form, schema };
    }
    // tslint:disable-next-line:no-shadowed-variable
    const meta = this.getMeta();
    if (meta && Object.keys(meta).length) {
      form = { ...form, meta };
    }
    // tslint:disable-next-line:no-shadowed-variable
    const snapshot = this.getSnapshot();
    if (snapshot) {
      form = { ...form, snapshot };
    }

    this.setState({ form });
  };

  private handleClose = () => {
    this.setState({ open: false });
  };

  // tslint:disable-next-line:no-shadowed-variable
  private onConfig = (config: string) => {
    this.setState(() => ({ config }));
  };

  // tslint:disable-next-line:no-shadowed-variable
  private onSchema = (schema: string) => {
    this.setState(() => ({ schema }));
  };

  // tslint:disable-next-line:no-shadowed-variable
  private onSnapshot = (snapshot: string) => {
    this.setState(() => ({ snapshot }));
  };

  // tslint:disable-next-line:no-shadowed-variable
  private onMeta = (meta: string) => {
    this.setState(() => ({ meta }));
  };
}

export default withStyles<keyof IDesignerStyles, {}>({
  action: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  container: {
    // minWidth: 1000
  },
  designer: {
    justifyContent: "space-around"
  },
  form: {
    // height: 450
  },
  formItem: {
    // flexDirection: "column",
    // flex: 0,
    // height: 450,
    // minWidth: 520,
    padding: 10
  },
  root: {
    // display: "flex",
    // justifyContent: "center",
    margin: 20
  },
  schema: {
    // flexDirection: "column",
    // flex: 0,
    // minWidth: 520
  },
  stretch: {
    padding: 10,
    width: "100%"
  }
})(Designer);
