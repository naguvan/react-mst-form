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

import Form from "../Form";
import Meta from "../Meta";
import Schema from "../Schema";
import Snapshot from "../Snapshot";

export interface IDesignerStyles {
  root: CSSProperties;
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
  meta?: IMetaConfig;
  schema?: ISchemaConfig;
  config: IFormConfig;
  snapshot?: {};
  open: boolean;
}

const config: IFormConfig = {
  title: "Test Form",
  cancel: "Cancel",
  submit: "create",
  schema: {
    type: "object",
    properties: {
      name: {
        meta: {
          layout: [["first", "last"], "middle", "age"]
        },
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
          error: "should not be empty",
          options: [
            { label: "One", value: 1 },
            { label: "Two", value: 2 },
            { label: "Three", value: 3 }
          ]
        },
        type: "number",
        title: "Select a type",
        enum: [1, 2, 3]
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

export class Designer extends Component<
  IDesignerProps & IDesignerStyleProps,
  IDesignerStates
> {
  public state: IDesignerStates = {
    width: "100%",
    height: "100%",
    config,
    open: false
  };

  public render(): ReactNode {
    const { className: clazz, classes, style } = this.props;
    const { width, height, open } = this.state;
    // tslint:disable-next-line:no-shadowed-variable
    const { config, meta, schema, snapshot } = this.state;
    const className: string = classNames(classes!.root, clazz);
    return (
      <div {...{ className, style }}>
        <Paper className={classes.root} elevation={3} style={{ padding: 15 }}>
          <Layout
            center={false}
            items={[
              <Button onClick={this.handleClickOpen}>Open Form Dialog</Button>,
              [
                [
                  <Schema config={config} onConfig={this.onConfig} />,
                  [
                    <Meta meta={meta} onMeta={this.onMeta} />,
                    <Snapshot
                      snapshot={snapshot}
                      onSnapshot={this.onSnapshot}
                    />
                  ]
                ],
                <Paper square elevation={3} style={{ width: "100%" }}>
                  <Form
                    className={classes.form}
                    config={config}
                    schema={schema}
                    meta={meta}
                    snapshot={snapshot}
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

  private handleClickOpen = () => {
    this.setState({ open: true });
  };

  private handleClose = () => {
    this.setState({ open: false });
  };

  // tslint:disable-next-line:no-shadowed-variable
  private onConfig = (config: IFormConfig) => {
    this.setState(() => ({ config }));
  };

  // tslint:disable-next-line:no-shadowed-variable
  private onSchema = (schema: ISchemaConfig) => {
    this.setState(() => ({ schema }));
  };

  // tslint:disable-next-line:no-shadowed-variable
  private onSnapshot = (snapshot: {}) => {
    this.setState(() => ({ snapshot }));
  };

  // tslint:disable-next-line:no-shadowed-variable
  private onMeta = (meta: IMetaConfig) => {
    this.setState(() => ({ meta }));
  };
}

export default withStyles<keyof IDesignerStyles, {}>({
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
