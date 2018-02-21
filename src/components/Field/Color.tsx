import * as React from 'react';
import { Component, ReactNode } from 'react';

import { IColorProps, IColorStates } from '@root/types';
import { IColor } from '@root/types';

import { observer } from 'mobx-react';

import Base from './Base';

import TextField from 'material-ui/TextField';

@observer
export default class Color extends Base<
    IColor,
    IColorProps,
    IColorStates
> {
    constructor(props: IColorProps, context: any) {
        super(props, context);
    }

    protected renderField(field: IColor): ReactNode {
        return (
            <>
                <TextField
                    key={field.name}
                    type={'color'}
                    margin={'normal'}
                    fullWidth={true}
                    name={field.name}
                    id={field.name}
                    value={field.value || '#000000'}
                    disabled={field.disabled}
                    error={!field.valid}
                    label={field.title}
                    helperText={field.errors.join('\n')}
                    // tslint:disable-next-line:jsx-no-lambda
                    onChange={e => field.setValue(e.target.value)}
                />
                <br />
            </>
        );
    }
}
