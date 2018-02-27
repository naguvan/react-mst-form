import * as React from 'react';
import { Component, ReactNode, Fragment } from 'react';

import { IArrayProps, IArrayStates } from '@root/types';
import { IArray, IForm } from '@root/types';

import { observer } from 'mobx-react';

import Base from './Base';

import { renderer } from './renderer';

import createType from '../../models/Type';

import IconButton from 'material-ui/IconButton';
import ActionAdd from 'material-ui-icons/Add';

@observer
export default class Array extends Base<IArray, IArrayProps, IArrayStates> {
    constructor(props: IArrayProps, context: any) {
        super(props, context);
    }

    protected renderType(type: IArray, form: IForm): ReactNode {
        const Type = createType();
        return (
            <>
                {type.types.map((item, index) => (
                    <Fragment key={index}>
                        {renderer(Type.create(item), form)}
                    </Fragment>
                ))}
                <IconButton // tslint:disable-next-line:jsx-no-lambda
                    onClick={e => type.add()}>
                    <ActionAdd />
                </IconButton>
            </>
        );
    }
}
