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

import { Flex } from "react-flow-layout";
import { IFormConfig } from "react-mst-form";

import Form from "../Form";
import Schema from "../Schema";

export interface IDesignerStyles {
  root: CSSProperties;
  container: CSSProperties;
  designer: CSSProperties;
  schema: CSSProperties;
  form: CSSProperties;
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
  config: IFormConfig;
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
        type: "object",
        properties: {
          first: {
            type: "string",
            title: "First",
            value: "naguvan",
            minLength: 5,
            sequence: 1
          },
          middle: {
            type: "string",
            title: "Middle",
            value: "sk",
            minLength: 5,
            sequence: 1
          },
          last: {
            type: "string",
            title: "Last",
            value: "sk",
            minLength: 5,
            sequence: 2
          },
          age: {
            type: "number",
            title: "Age",
            value: 5,
            sequence: 2,
            maximum: 10,
            minimum: 3
          }
        } // ,
        // layout: [["first", "last"], "middle", "age"]
      },
      title: {
        type: "string",
        title: "Title",
        value: "sk",
        minLength: 5
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
        component: "color",
        format: "color"
      },
      size: {
        type: "number",
        title: "Size",
        value: 5,
        maximum: 10,
        minimum: 3,
        multipleOf: 3
      },
      type: {
        type: "number",
        title: "Select a type",
        enum: [1, 2],
        options: [{ label: "One", value: 1 }, { label: "Two", value: 2 }]
      },
      agree: {
        type: "boolean",
        title: "I agree with your terms",
        value: false,
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
  },
  sections: [
    {
      title: "Basic",
      layout: ["name", "title", ["size", "color"]]
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
  public state = {
    width: "100%",
    height: "100%",
    config,
    open: false
  };

  private containers: HTMLDivElement[] = [];

  private timeout: number = -1;

  public componentWillUpdate() {
    this.containers.length = 0;
  }

  public componentDidMount() {
    this.adjustWidthHeight();
  }

  public componentDidUpdate() {
    this.adjustWidthHeight();
  }

  public componentWillUnmount() {
    window.clearTimeout(this.timeout);
  }

  public render(): ReactNode {
    const { className: clazz, classes, style } = this.props;
    // tslint:disable-next-line:no-shadowed-variable
    const { width, height, config, open } = this.state;
    const className: string = classNames(classes!.root, clazz);
    return (
      <div {...{ className, style }}>
        <div
          className={classes.container}
          style={{ width, height }}
          ref={this.addContainer}
        >
          <Button onClick={this.handleClickOpen}>Open Form Dialog</Button>
          <Flex.Set direction={"row"} className={classes.designer}>
            <Flex.Item className={classes.schema}>
              <h1>Schema</h1>
              <Schema config={config} onConfig={this.onConfig} />
            </Flex.Item>
            <Flex.Item className={classes.form}>
              <h1>Form</h1>
              <Paper square elevation={3}>
                <Form config={config} open={open} onClose={this.handleClose} />
              </Paper>
            </Flex.Item>
          </Flex.Set>
        </div>
      </div>
    );
  }

  private handleClickOpen = () => {
    this.setState({ open: true });
  };

  private handleClose = () => {
    this.setState({ open: false });
  };

  private addContainer = (container: HTMLDivElement): void => {
    if (container) {
      this.containers.push(container);
    }
  };

  private adjustWidthHeight(): void {
    window.clearTimeout(this.timeout);
    const { width, height } = this.state;
    if (width === "auto" || height === "auto") {
      this.timeout = window.setTimeout(() => this.updateWidthHeight(), 4);
    }
  }

  private updateWidthHeight(): void {
    const containers = this.containers.filter(container => !!container);
    const widths = containers.map(container => container.offsetWidth);
    const heights = containers.map(container => container.offsetHeight);

    const width = `${Math.max(...widths)}px`;
    const height = `${Math.max(...heights)}px`;

    // this.setState(() => ({ width, height }));
  }

  // tslint:disable-next-line:no-shadowed-variable
  private onConfig = (config: IFormConfig) => {
    this.setState(() => ({ config }));
  };
}

export default withStyles<keyof IDesignerStyles, {}>({
  container: {
    minWidth: 1000
  },
  designer: {
    justifyContent: "space-around"
  },
  form: {
    flexDirection: "column",
    flex: 0,
    minWidth: 520,
    padding: 10
  },
  root: {
    display: "flex",
    justifyContent: "center",
    margin: 20
  },
  schema: {
    flexDirection: "column",
    flex: 0,
    minWidth: 520
  }
})(Designer);
