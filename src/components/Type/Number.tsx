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

    protected renderType(type: INumber): ReactNode {
        const select: boolean = !!type.enum && type.enum.length > 0;
        return (
            <>
                <TextField
                    select={select}
                    key={type.name}
                    type={'number'}
                    margin={'normal'}
                    fullWidth={true}
                    name={type.name}
                    id={type.name}
                    value={type.value || ''}
                    disabled={type.disabled}
                    error={!type.valid}
                    label={type.title}
                    helperText={type.errors.join('\n')}
                    // tslint:disable-next-line:jsx-no-lambda
                    onChange={e =>
                        type.sync(toNumber(e.target.value, type.value))
                    }>
                    {type.options &&
                        type.options.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                </TextField>
            </>
        );
    }
}
