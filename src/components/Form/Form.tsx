import * as React from 'react';
import { Component, ReactNode } from 'react';
import { observer } from 'mobx-react';

import { IForm, IFormProps, IFormStates } from '@root/types';
import { IFormStyleProps, IFormStyles } from '@root/types';

import withStyles from 'material-ui/styles/withStyles';
import * as classNames from 'classnames';

import Layout from '../Layout';

@observer
export class Form extends Component<IFormProps & IFormStyleProps, IFormStates> {
    constructor(props: IFormProps & IFormStyleProps, context: {}) {
        super(props, context);
    }

    public render(): ReactNode {
        const { form, renderer } = this.props;
        const { className, classes, style } = this.props;
        const root: string = classNames(classes!.root, className);
        return (
            <div className={root} style={style}>
                <Layout
                    center
                    className={classes.layout}
                    classes={{ set: classes.set, item: classes.item }}
                    items={form.layout}
                    render={this.getFieldRenderer() as any}
                />
            </div>
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
