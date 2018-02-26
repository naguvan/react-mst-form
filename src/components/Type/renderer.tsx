import * as React from 'react';
import { Component, ReactNode } from 'react';

import { IType, IForm, IString, IObject } from '@root/types';
import { INumber, IBoolean, INull } from '@root/types';

import String from './String';
import Number from './Number';
import Boolean from './Boolean';
import Color from './Color';
import Object from './Object';

export function renderer(type: IType, form: IForm): ReactNode {
    switch (type.type) {
        case 'object':
            return <Object type={type as IObject} form={form} />;
        case 'number':
            return <Number type={type as INumber} form={form} />;
        case 'boolean':
            return <Boolean type={type as IBoolean} form={form} />;
        case 'string':
            if (type.component === 'color') {
                return <Color type={type as IString} form={form} />;
            }
        default:
            return <String type={type as IString} form={form} />;
    }
}
