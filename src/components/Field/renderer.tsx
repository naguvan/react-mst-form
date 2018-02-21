import * as React from 'react';
import { Component, ReactNode } from 'react';

import { IField, IForm, IStringField } from '@root/types';
import { INumberField, IBooleanField } from '@root/types';

import String from './String';
import Number from './Number';
import Boolean from './Boolean';

export function renderer(field: IField, form: IForm): ReactNode {
    switch (field.type) {
        case 'number':
            return <Number field={field as INumberField} form={form} />;
        case 'boolean':
            return <Boolean field={field as IBooleanField} form={form} />;
        case 'string':
        default:
            return <String field={field as IStringField} form={form} />;
    }
}
