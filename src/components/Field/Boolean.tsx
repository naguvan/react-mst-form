import * as React from 'react';
import { Component, ReactNode } from 'react';

import { IBooleanFieldProps, IBooleanFieldStates } from '@root/types';
import { IBoolean } from '@root/types';

import { observer } from 'mobx-react';

import Base from './Base';

import FormControlLabel from 'material-ui/Form/FormControlLabel';

import Switch from 'material-ui/Switch';

@observer
export default class Boolean extends Base<
    IBoolean,
    IBooleanFieldProps,
    IBooleanFieldStates
> {
    constructor(props: IBooleanFieldProps, context: any) {
        super(props, context);
    }

    protected renderField(field: IBoolean): ReactNode {
        return (
            <>
                <FormControlLabel
                    label={field.title}
                    disabled={field.disabled}
                    control={
                        <Switch
                            key={field.name}
                            name={field.name}
                            checked={field.value}
                            color={'primary'}
                            disabled={field.disabled}
                            // tslint:disable-next-line:jsx-no-lambda
                            onChange={e => field.setValue(e.target.checked)}
                        />
                    }
                />
            </>
        );
    }
}
