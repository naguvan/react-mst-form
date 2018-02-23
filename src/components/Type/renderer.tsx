import * as React from 'react';
import { Component, ReactNode } from 'react';

import { IType, IForm, IString } from '@root/types';
import { INumber, IBoolean, IColor } from '@root/types';

import String from './String';
import Number from './Number';
import Boolean from './Boolean';
import Color from './Color';

export function renderer(type: IType, form: IForm): ReactNode {
    switch (type.type) {
        case 'number':
            return <Number type={type as INumber} form={form} />;
        case 'boolean':
            return <Boolean type={type as IBoolean} form={form} />;
        case 'color':
            return <Color type={type as IColor} form={form} />;
        case 'string':
        default:
            return <String type={type as IString} form={form} />;
    }
}
