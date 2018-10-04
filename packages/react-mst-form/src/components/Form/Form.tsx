import * as React from "react";
import { Component, ReactNode } from "react";
import { observer } from "mobx-react";

import { IType } from "reactive-json-schema";

import { CSSProperties, WithStyles } from "@material-ui/core/styles/withStyles";
import withStyles from "@material-ui/core/styles/withStyles";
import classNames from "classnames";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Object from "../Type/Object";

import { IForm, IFormLayout, IFormSection } from "../../models/Form";

export interface IFormStyles {
  root: CSSProperties;
  layout: CSSProperties;
  set: CSSProperties;
  item: CSSProperties;
  secondary: CSSProperties;
}

export interface IFormStyleProps extends WithStyles<keyof IFormStyles> {}

export interface IFormProps {
  form: IForm;
  style?: CSSProperties;
  className?: string;
  renderer(type: IType, form: IForm): ReactNode;
}

export interface IFormStates {
  active: number;
}

@observer
export class Form extends Component<IFormProps & IFormStyleProps, IFormStates> {
  state = { active: 0 };

  public render(): ReactNode {
    const { form } = this.props;
    const { active } = this.state;
    const { className, classes, style } = this.props;
    const root: string = classNames(classes!.root, className);
    return (
      <div className={root} style={style}>
        {form.sections.length
          ? this.renderSections(form, active)
          : this.renderForm(form, form.layout)}
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
          {form.sections.map((section, index: number) => (
            <Tab
              key={section.title}
              label={section.title}
              value={index}
              className={
                this.hasSectionError(section, form) ? classes.secondary : ""
              }
            />
          ))}
        </Tabs>
        {this.renderForm(form, section.layout)}
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

  protected renderForm(form: IForm, layout: IFormLayout): ReactNode {
    return <Object type={form.schema} form={form} layout={layout} />;
  }
}

export default withStyles<keyof IFormStyles, {}>(theme => ({
  root: {},
  layout: {},
  set: {},
  item: {},
  secondary: {
    color: theme.palette.secondary.main
  }
}))(Form);
