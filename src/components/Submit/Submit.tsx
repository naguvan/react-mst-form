import * as React from 'react';
import { Component, ReactNode } from 'react';

import { IForm, ISubmitProps, ISubmitStates } from '@root/types';

import { observer } from 'mobx-react';

import Button from 'material-ui/Button';

@observer
export default class Submit extends Component<ISubmitProps, ISubmitStates> {
    constructor(props: ISubmitProps, context: any) {
        super(props, context);
    }

    public render(): ReactNode {
        const { form, label = 'Submit' } = this.props;
        return (
            <Button
                variant={'raised'}
                color={'primary'}
                disabled={!form.valid}
                onClick={this.onSubmit}>
                {label}
            </Button>
        );
    }

    private onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        const { form, onSubmit } = this.props;
        if (onSubmit) {
            onSubmit(form.values);
        }
    };
}
