import * as React from "react";
import { Component, ReactNode } from "react";

import { observer } from "mobx-react";

import { CSSProperties, WithStyles } from "@material-ui/core/styles/withStyles";
import withStyles from "@material-ui/core/styles/withStyles";
import classNames from "classnames";

import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";

import Object from "../Type/Object";
import { IRenderer } from "../Type/Renderer";

import { IForm, IFormLayout, IFormSection } from "../../models/Form";

export interface IContentStyles {
  root: CSSProperties;
  layout: CSSProperties;
  set: CSSProperties;
  item: CSSProperties;
  secondary: CSSProperties;
}

export interface IContentStyleProps extends WithStyles<keyof IContentStyles> {}

export interface IContentProps {
  form: IForm;
  style?: CSSProperties;
  className?: string;
  renderer: IRenderer;
}

export interface IContentStates {
  active: number;
}

@observer
export class Content extends Component<
  IContentProps & IContentStyleProps,
  IContentStates
> {
  public state = { active: 0 };

  public render(): ReactNode {
    const { form } = this.props;
    const { active } = this.state;
    const { className: clazz, classes, style } = this.props;
    const className: string = classNames(classes!.root, clazz);
    return (
      <div {...{ className, style }}>
        {form.sections.length
          ? this.renderSections(form, active)
          : this.renderContent(form, form.layout)}
      </div>
    );
  }

  protected renderSections(form: IForm, active: number): ReactNode {
    const { classes } = this.props;
    const section: IFormSection = form.sections[active];
    const hasError = this.hasSectionError(section, form);
    return (
      <>
        <Tabs
          indicatorColor={hasError ? "secondary" : "primary"}
          textColor={hasError ? "secondary" : "primary"}
          value={active}
          onChange={this.handleChange}
        >
          {form.sections.map((sectionx, index: number) => (
            <Tab
              key={sectionx.title}
              label={sectionx.title}
              value={index}
              className={
                this.hasSectionError(sectionx, form) ? classes.secondary : ""
              }
            />
          ))}
        </Tabs>
        {this.renderContent(form, section.layout)}
      </>
    );
  }

  protected hasSectionError(section: IFormSection, form: IForm): boolean {
    return this.hasLayoutError(section.layout, form);
  }

  protected hasLayoutError(layout: IFormLayout, form: IForm): boolean {
    return layout.some(item => {
      if (typeof item === "string") {
        return !form.get(item)!.valid;
      }
      return this.hasLayoutError(item as IFormLayout, form);
    });
  }

  protected handleChange = (event: any, active: number) => {
    this.setState({ active });
  };

  protected renderContent(form: IForm, layout: IFormLayout): ReactNode {
    return (
      <Object
        type={form.schema}
        form={form}
        layout={layout}
        renderer={this.props.renderer}
      />
    );
  }
}

export default withStyles<keyof IContentStyles, {}>(theme => ({
  item: {},
  layout: {},
  root: {},
  secondary: {
    color: theme.palette.secondary.main
  },
  set: {}
}))(Content);
