import * as React from 'react';
import { Component, ReactNode } from 'react';

import { INumberFieldProps, INumberFieldStates } from '@root/types';
import { INumberField } from '@root/types';

import { observer } from 'mobx-react';

import Base from './Base';

import TextField from 'material-ui/TextField';

import { toNumber } from '@root/utils';

@observer
export default class Number extends Base<
    INumberField,
    INumberFieldProps,
    INumberFieldStates
> {
    constructor(props: INumberFieldProps, context: any) {
        super(props, context);
    }

    protected renderField(field: INumberField): ReactNode {
        return (
            <>
                <TextField
                    key={field.name}
                    type={'number'}
                    margin={'normal'}
                    fullWidth={true}
                    name={field.name}
                    id={field.name}
                    value={field.value || ''}
                    disabled={field.disabled}
                    error={!field.valid}
                    label={field.title}
                    helperText={field.errors.join('\n')}
                    // tslint:disable-next-line:jsx-no-lambda
                    onChange={e =>
                        field.setValue(toNumber(e.target.value, field.value))
                    }
                />
                <br />
            </>
        );
    }
}
