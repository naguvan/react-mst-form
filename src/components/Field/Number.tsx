import * as React from 'react';
import { Component, ReactNode } from 'react';

import { INumberProps, INumberStates } from '@root/types';
import { INumber } from '@root/types';

import { observer } from 'mobx-react';

import Base from './Base';

import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/Menu/MenuItem';

import { toNumber } from '@root/utils';

@observer
export default class Number extends Base<INumber, INumberProps, INumberStates> {
    constructor(props: INumberProps, context: any) {
        super(props, context);
    }

    protected renderField(field: INumber): ReactNode {
        const select: boolean = !!field.enum && field.enum.length > 0;
        return (
            <>
                <TextField
                    select={select}
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
                    }>
                    {field.options &&
                        field.options.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                </TextField>
            </>
        );
    }
}
