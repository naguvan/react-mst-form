import * as React from 'react';
import { Component, ReactNode } from 'react';

import { IField, IStringField } from '@root/types';
import { INumberField, IBooleanField } from '@root/types';

import String from './String';
import Number from './Number';
import Boolean from './Boolean';

export function factory(field: IField): ReactNode {
    switch (field.type) {
        case 'number':
            return <Number field={field as INumberField} />;
        case 'boolean':
            return <Boolean field={field as IBooleanField} />;
        case 'string':
        default:
            return <String field={field as IStringField} />;
    }
}
