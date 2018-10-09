import * as React from "react";
import { Component, ReactNode } from "react";

import { observer } from "mobx-react";

import { CSSProperties, WithStyles } from "@material-ui/core/styles/withStyles";
import withStyles from "@material-ui/core/styles/withStyles";
import classNames from "classnames";

import { IRenderer } from "../Type/Renderer";

import { IForm } from "../../models/Form";

export interface IContentStyles {
  root: CSSProperties;
}

export interface IContentStyleProps extends WithStyles<keyof IContentStyles> {}

export interface IContentProps {
  form: IForm;
  style?: CSSProperties;
  className?: string;
  renderer: IRenderer;
}

// tslint:disable-next-line:no-empty-interface
export interface IContentStates {}

@observer
export class Content extends Component<
  IContentProps & IContentStyleProps,
  IContentStates
> {
  public render(): ReactNode {
    const { form, renderer } = this.props;
    const { className: clazz, classes, style } = this.props;
    const className: string = classNames(classes!.root, clazz);
    const layout = form.selected ? form.selected.layout : undefined;
    return (
      <div {...{ className, style }}>
        {renderer.render(form.schema, form, layout)}
      </div>
    );
  }
}

export default withStyles<keyof IContentStyles, {}>({
  root: {}
})(Content);
