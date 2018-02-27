import * as React from 'react';
import { Component, ReactNode } from 'react';
import { observer } from 'mobx-react';

import { IForm, IFormProps, IFormStates, IFormSection } from '@root/types';
import { IFormStyleProps, IFormStyles, IFormLayout } from '@root/types';

import { WithStyles, StyledComponentProps } from 'material-ui';
import withStyles from 'material-ui/styles/withStyles';
import * as classNames from 'classnames';

import Tabs, { Tab } from 'material-ui/Tabs';
import Object from '../Type/Object';

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
        const { classes } = this.props;
        const section: IFormSection = form.sections[active];
        const hasError = this.hasSectionError(section, form);
        return (
            <>
                <Tabs
                    indicatorColor={hasError ? 'secondary' : 'primary'}
                    textColor={hasError ? 'secondary' : 'primary'}
                    value={active}
                    onChange={this.handleChange}>
                    {form.sections.map((section, index: number) => (
                        <Tab
                            key={section.title}
                            label={section.title}
                            value={index}
                            className={
                                this.hasSectionError(section, form)
                                    ? classes.secondary
                                    : ''
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
            if (typeof item === 'string') {
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

export default withStyles<keyof IFormStyles>(theme => ({
    root: {},
    layout: {},
    set: {},
    item: {},
    secondary: {
        color: theme.palette.secondary.main
    }
}))(Form);
