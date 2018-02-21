import * as React from 'react';
import { Component, ReactNode } from 'react';
import { observer } from 'mobx-react';

import { IForm, IFormProps, IFormStates, IFormSection } from '@root/types';
import { IFormStyleProps, IFormStyles, IFormLayout } from '@root/types';

import { WithStyles, StyledComponentProps } from 'material-ui';
import withStyles from 'material-ui/styles/withStyles';
import * as classNames from 'classnames';

import Tabs, { Tab } from 'material-ui/Tabs';

import Layout from '../Layout';

@observer
export class Form extends Component<IFormProps & IFormStyleProps, IFormStates> {
    constructor(props: IFormProps & IFormStyleProps, context: {}) {
        super(props, context);
        this.state = { active: 0 };
    }

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
        return (
            <>
                <Tabs
                    indicatorColor="primary"
                    textColor="primary"
                    value={active}
                    onChange={this.handleChange}>
                    {form.sections.map((section, index: number) => (
                        <Tab
                            key={section.title}
                            label={section.title}
                            value={index}
                        />
                    ))}
                </Tabs>
                {this.renderForm(form, form.sections[active].layout)}
            </>
        );
    }

    protected handleChange = (event: any, active: number) => {
        this.setState({ active });
    };

    protected renderForm(form: IForm, layout: IFormLayout): ReactNode {
        const { classes } = this.props;
        return (
            <Layout
                center
                className={classes.layout}
                classes={{ set: classes.set, item: classes.item }}
                items={layout}
                render={this.getFieldRenderer() as any}
            />
        );
    }

    protected getFieldRenderer(): (item: string) => ReactNode {
        const { form, renderer } = this.props;
        return item => renderer(form.get(item)!, form);
    }
}

export default withStyles<keyof IFormStyles>({
    root: {},
    layout: {},
    set: {},
    item: {}
})(Form);
