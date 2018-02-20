import * as React from 'react';
import { Component, ReactNode } from 'react';

import { IBooleanFieldProps, IBooleanFieldStates } from '@root/types';
import { IBooleanField } from '@root/types';

import { observer } from 'mobx-react';

import Base from './Base';

import Switch from 'material-ui/Switch';

@observer
export default class Boolean extends Base<
    IBooleanField,
    IBooleanFieldProps,
    IBooleanFieldStates
> {
    constructor(props: IBooleanFieldProps, context: any) {
        super(props, context);
    }

    protected renderField(field: IBooleanField): ReactNode {
        return (
            <>
                <Switch
                    key={field.name}
                    name={field.name}
                    checked={field.value}
                    color={'primary'}
                    disabled={field.disabled}
                    // tslint:disable-next-line:jsx-no-lambda
                    onChange={e => field.setValue(e.target.checked)}
                />
                <br />
            </>
        );
    }
}
