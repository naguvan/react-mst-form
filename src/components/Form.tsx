import * as React from 'react';
import { Component, ReactNode } from 'react';
import { observer } from 'mobx-react';

import { IForm, IFormProps, IFormStates } from '@root/types';

@observer
export default class Form extends Component<IFormProps, IFormStates> {
    public render(): ReactNode {
        const { form } = this.props;
        return (
            <div>
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
