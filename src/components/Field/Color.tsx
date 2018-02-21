import * as React from 'react';
import { Component, ReactNode } from 'react';

import { IColorFieldProps, IColorFieldStates } from '@root/types';
import { IColor } from '@root/types';

import { observer } from 'mobx-react';

import Base from './Base';

import TextField from 'material-ui/TextField';

@observer
export default class Color extends Base<
    IColor,
    IColorFieldProps,
    IColorFieldStates
> {
    constructor(props: IColorFieldProps, context: any) {
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
