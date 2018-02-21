import * as React from 'react';
import { Component, ReactNode } from 'react';

import { IEnumFieldProps, IEnumFieldStates } from '@root/types';
import { IEnum } from '@root/types';

import { observer } from 'mobx-react';

import Base from './Base';

import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/Menu/MenuItem';

@observer
export default class Enum extends Base<
    IEnum,
    IEnumFieldProps,
    IEnumFieldStates
> {
    constructor(props: IEnumFieldProps, context: any) {
        super(props, context);
    }

    protected renderField(field: IEnum): ReactNode {
        return (
            <>
                <TextField
                    select
                    key={field.name}
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
                    onChange={e => field.setValue(e.target.value)}>
                    {field.options.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </>
        );
    }
}
