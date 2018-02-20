import * as React from 'react';
import { Component, ReactNode } from 'react';
import { observer } from 'mobx-react';

import { IForm, IFormProps, IFormStates } from '@root/types';
import { IFormStyleProps, IFormStyles } from '@root/types';

import withStyles from 'material-ui/styles/withStyles';
import * as classNames from 'classnames';

@observer
export class Form extends Component<IFormProps & IFormStyleProps, IFormStates> {
    constructor(props: IFormProps & IFormStyleProps, context: {}) {
        super(props, context);
    }

    public render(): ReactNode {
        const { form } = this.props;
        const { className, classes, style } = this.props;
        const root: string = classNames(classes!.root, className);
        return (
            <div className={root} style={style}>
                <h1>Form</h1>
                <ul>
                    {form.fields.map(field => (
                        <li key={field.name}>
                            {field.name}-{field.value}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default withStyles<keyof IFormStyles>({
    root: {}
})(Form);
