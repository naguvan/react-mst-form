import * as React from 'react';
import { Component, ReactNode, Fragment } from 'react';

import { IObjectProps, IObjectStates } from '@root/types';
import { IObject, IForm } from '@root/types';

import { observer } from 'mobx-react';

import Base from './Base';

import FormControlLabel from 'material-ui/Form/FormControlLabel';
import FormHelperText from 'material-ui/Form/FormHelperText';

import { renderer } from './renderer';

@observer
export default class NObject extends Base<
    IObject,
    IObjectProps,
    IObjectStates
> {
    constructor(props: IObjectProps, context: any) {
        super(props, context);
    }

    protected renderType(type: IObject, form: IForm): ReactNode {
        return (
            <>
                {type
                    .getProperties()
                    .map(property => (
                        <Fragment key={property}>
                            {renderer(type.getProperty(property)!, form)}
                        </Fragment>
                    ))}
                {!type.valid && (
                    <FormHelperText error>
                        {type.errors.join('\n')}
                    </FormHelperText>
                )}
            </>
        );
    }
}
