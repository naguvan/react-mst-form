import * as React from "react";
import { Component, ReactNode } from "react";

import { observer } from "mobx-react";

import { CSSProperties, WithStyles } from "@material-ui/core/styles/withStyles";
import withStyles from "@material-ui/core/styles/withStyles";
import classNames from "classnames";

import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Typography from "@material-ui/core/Typography";

import { ILayout } from "reactive-json-schema";

import { IForm } from "../../models/Form";
import { ISection } from "../../models/Section";

export interface IHeaderStyles {
  root: CSSProperties;
  title: CSSProperties;
  secondary: CSSProperties;
}

export interface IHeaderStyleProps extends WithStyles<keyof IHeaderStyles> {}

export interface IHeaderProps {
  form: IForm;
  style?: CSSProperties;
  className?: string;
}

// tslint:disable-next-line:no-empty-interface
export interface IHeaderStates {}

@observer
export class Header extends Component<
  IHeaderProps & IHeaderStyleProps,
  IHeaderStates
> {
  public render(): ReactNode {
    const { className: clazz, classes, style } = this.props;
    const { form } = this.props;
    if (!form.selected) {
      return (
        <Typography variant="h4" className={classes.title}>
          {form.title}
        </Typography>
      );
    }
    const className: string = classNames(classes!.root, clazz);
    const selected: ISection = form.selected;
    const hasError = this.hasSectionError(selected, form);
    return (
      <Tabs
        {...{ className, style }}
        indicatorColor={hasError ? "secondary" : "primary"}
        textColor={hasError ? "secondary" : "primary"}
        value={selected}
        onChange={this.handleChange}
      >
        {form.sections.map(section => (
          <Tab
            key={section.title}
            label={section.title}
            value={section}
            className={
              this.hasSectionError(section, form) ? classes.secondary : ""
            }
          />
        ))}
      </Tabs>
    );
  }

  protected hasSectionError(section: ISection, form: IForm): boolean {
    return this.hasLayoutError(section.layout, form);
  }

  protected hasLayoutError(layout: ILayout, form: IForm): boolean {
    return layout.some(item => {
      if (typeof item === "string") {
        return !form.get(item)!.valid;
      }
      return this.hasLayoutError(item as ILayout, form);
    });
  }

  protected handleChange = (event: any, selected: ISection) => {
    const { form } = this.props;
    form.makeSelection(selected);
  };
}

export default withStyles<keyof IHeaderStyles, {}>(theme => ({
  root: {},
  secondary: {
    color: theme.palette.secondary.main
  },
  title: {}
}))(Header);
