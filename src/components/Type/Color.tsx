import * as React from 'react';
import { Component, ReactNode } from 'react';

import { IStringProps, IStringStates } from '@root/types';
import { IString } from '@root/types';

import { observer } from 'mobx-react';

import Base from './Base';

import TextField from 'material-ui/TextField';

@observer
export default class Color extends Base<IString, IStringProps, IStringStates> {
    constructor(props: IStringProps, context: any) {
        super(props, context);
    }

    protected renderType(type: IString): ReactNode {
        return (
            <>
                <TextField
                    key={type.name}
                    type={'color'}
                    margin={'normal'}
                    fullWidth={true}
                    name={type.name}
                    id={type.name}
                    value={type.value || '#000000'}
                    disabled={type.disabled}
                    error={!type.valid}
                    label={type.title}
                    helperText={type.errors.join('\n')}
                    // tslint:disable-next-line:jsx-no-lambda
                    onChange={e => type.setValue(e.target.value)}
                />
            </>
        );
    }
}
