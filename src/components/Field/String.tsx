import * as React from 'react';
import { Component, ReactNode } from 'react';

import { IStringProps, IStringStates } from '@root/types';
import { IString } from '@root/types';

import { observer } from 'mobx-react';

import Base from './Base';

import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/Menu/MenuItem';

@observer
export default class String extends Base<IString, IStringProps, IStringStates> {
    constructor(props: IStringProps, context: any) {
        super(props, context);
    }

    protected renderField(field: IString): ReactNode {
        const select: boolean = !!field.enum && field.enum.length > 0;
        return (
            <>
                <TextField
                    select={select}
                    key={field.name}
                    type={'text'}
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
                    {field.options && field.options.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </>
        );
    }
}
