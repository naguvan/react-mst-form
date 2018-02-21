import * as React from 'react';
import { Component, ReactNode } from 'react';

import { IField, IForm, IString, IEnum } from '@root/types';
import { INumber, IBoolean, IColor } from '@root/types';

import String from './String';
import Number from './Number';
import Boolean from './Boolean';
import Color from './Color';
import Enum from './Enum';

export function renderer(field: IField, form: IForm): ReactNode {
    switch (field.type) {
        case 'number':
            return <Number field={field as INumber} form={form} />;
        case 'boolean':
            return <Boolean field={field as IBoolean} form={form} />;
        case 'color':
            return <Color field={field as IColor} form={form} />;
        case 'enum':
            return <Enum field={field as IEnum} form={form} />;
        case 'string':
        default:
            return <String field={field as IString} form={form} />;
    }
}
