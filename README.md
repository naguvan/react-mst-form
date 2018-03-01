# react-mst-form

Library for generating React forms from [JSON schema](https://json-schema.org/) using the [react](https://github.com/facebook/react), [material-ui](https://github.com/mui-org/material-ui), [mobx](https://github.com/mobxjs/mobx) and [mobx-state-tree](https://github.com/mobxjs/mobx-state-tree).

**https://naguvan.github.io/react-mst-form/demo/index.html**

# Running the demo

To run the `demo`, clone this repository, then run:

```bash
yarn install

yarn run dev

yarn run demo
```

# Basic usage

```jsx
import React from 'react';
import { render } from 'react-dom';

import { create } from 'jss';
import preset from 'jss-preset-default';
import JssProvider from 'react-jss/lib/JssProvider';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import createMuiTheme from 'material-ui/styles/createMuiTheme';

import { Form } from './src';

const config = {
    title: 'Test Form',
    schema: {
        type: 'object',
        properties: {
            name: {
                type: 'object',
                properties: {
                    first: {
                        type: 'string',
                        title: 'First',
                        value: 'naguvan',
                        minLength: 5,
                        sequence: 1
                    },
                    middle: {
                        type: 'string',
                        title: 'Middle',
                        value: 'sk',
                        minLength: 5,
                        sequence: 1
                    },
                    last: {
                        type: 'string',
                        title: 'Last',
                        value: 'sk',
                        minLength: 5,
                        sequence: 2
                    },
                    age: {
                        type: 'number',
                        title: 'Age',
                        value: 5,
                        sequence: 2,
                        maximum: 10,
                        minimum: 3
                    }
                },
                layout: [['first', 'last'], 'middle', 'age']
            },
            title: {
                type: 'string',
                title: 'Title',
                value: 'sk',
                minLength: 5
            },
            ipv4: {
                type: 'string',
                title: 'ipv4',
                minLength: 5,
                maxLength: 20,
                format: 'ipv4'
            },
            color: {
                type: 'string',
                title: 'In which color',
                component: 'color',
                format: 'color'
            },
            size: {
                type: 'number',
                title: 'Size',
                value: 5,
                maximum: 10,
                minimum: 3,
                multipleOf: 3
            },
            type: {
                type: 'number',
                title: 'Select a type',
                enum: [1, 2],
                options: [
                    { label: 'One', value: 1 },
                    { label: 'Two', value: 2 }
                ]
            },
            agree: {
                type: 'boolean',
                title: 'I agree with your terms',
                value: false,
                const: true
            },
            array: {
                type: 'array',
                title: 'Array',
                items: {
                    type: 'object',
                    properties: {
                        name: {
                            type: 'string',
                            title: 'name',
                            minLength: 3
                        },
                        age: {
                            type: 'number',
                            title: 'age',
                            multipleOf: 2,
                            minimum: 2
                        }
                    }
                },
                minItems: 2,
                maxItems: 4
            }
        }
    },
    sections: [
        {
            title: 'Basic',
            layout: ['name', 'title', ['size', 'color']]
        },
        {
            title: 'Others',
            layout: ['ipv4', 'type', 'agree', 'array']
        }
    ]
};

const onSubmit = values => {
    window.alert(`submitted values:\n\n${JSON.stringify(values, null, 2)}`);
};

const jss = create(preset());

render(
    <JssProvider jss={jss}>
        <MuiThemeProvider theme={createMuiTheme({})}>
            <Form config={config} onSubmit={onSubmit} />
        </MuiThemeProvider>
    </JssProvider>,
    document.getElementById('form-holder')
);
```

And, provided that you have a `<div id="form-holder">`, you should see something like this:

![](https://raw.githubusercontent.com/naguvan/react-mst-form/master/demo/sections.png)

And when the form has validation errors..

![](https://raw.githubusercontent.com/naguvan/react-mst-form/master/demo/form-validation.png)
