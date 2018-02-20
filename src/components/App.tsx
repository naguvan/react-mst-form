import * as React from 'react';
import { Component, ReactNode } from 'react';

import FormView from './Form';
import { Form as FormModel } from '../models/form/Form';

export interface IAppProps {}

export interface IAppStates {}

const form = FormModel.create({
    title: 'Test Form',
    properties: {
        name: {
            title: 'Name',
            value: 'sk',
            type: 'string',
            minLength: 5
        },
        age: {
            title: 'Age',
            value: 1,
            type: 'number',
            maximum: 10,
            minimum: 0
        },
        boy: {
            title: 'Boy?',
            value: true,
            type: 'boolean'
        }
    },
    layout: ['name', 'age', ['boy']]
});

export default class App extends Component<IAppProps, IAppStates> {
    public render(): ReactNode {
        return (
            <div>
                <h1>App Form </h1>
                <FormView form={form} />
            </div>
        );
    }
}
