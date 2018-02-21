import * as React from 'react';
import { Component, ReactNode } from 'react';

import { IField, IForm, IString } from '@root/types';
import { INumber, IBoolean } from '@root/types';

import String from './String';
import Number from './Number';
import Boolean from './Boolean';

export function renderer(field: IField, form: IForm): ReactNode {
    switch (field.type) {
        case 'number':
            return <Number field={field as INumber} form={form} />;
        case 'boolean':
            return <Boolean field={field as IBoolean} form={form} />;
        case 'string':
        default:
            return <String field={field as IString} form={form} />;
    }
}
