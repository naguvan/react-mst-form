import * as React from 'react';
import { Component, ReactNode } from 'react';

import { IStringProps, IStringStates } from '@root/types';
import { IString, IForm } from '@root/types';

import { observer } from 'mobx-react';

import Base from './Base';

import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/Menu/MenuItem';

@observer
export default class String extends Base<IString, IStringProps, IStringStates> {
    constructor(props: IStringProps, context: any) {
        super(props, context);
    }

    protected renderType(type: IString, form: IForm): ReactNode {
        const select: boolean = !!type.enum && type.enum.length > 0;
        return (
            <>
                <TextField
                    select={select}
                    key={type.name}
                    type={'text'}
                    margin={'normal'}
                    fullWidth={true}
                    name={type.name}
                    id={type.name}
                    value={type.data || ''}
                    disabled={type.disabled}
                    error={!type.valid}
                    label={type.title}
                    helperText={type.errors.join('\n')}
                    // tslint:disable-next-line:jsx-no-lambda
                    onChange={e => type.sync(e.target.value)}>
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
