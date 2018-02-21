# react-mst-form

Library for generating React forms from [JSON schema](https://json-schema.org/) using the [react](https://github.com/facebook/react), [material-ui](https://github.com/mui-org/material-ui), [mobx](https://github.com/mobxjs/mobx) and [mobx-state-tree](https://github.com/mobxjs/mobx-state-tree).

**https://naguvan.github.io/react-mst-form**

# Online demo

[online demo](https://naguvan.github.io/react-mst-form/demo/index.html)

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
    title: 'Form',
    properties: {
        title: {
            type: 'string',
            title: 'Title',
            value: 'sk',
            minLength: 5
        },
        color: {
            type: 'color',
            title: 'In which color'
        },
        size: {
            type: 'number',
            title: 'Size',
            value: 5,
            maximum: 10,
            minimum: 3
        },
        type: {
            type: 'enum',
            title: 'Select a type',
            options: [
                { label: 'One', value: '1' },
                { label: 'Two', value: '2' }
            ]
        },
        agree: {
            type: 'boolean',
            title: 'I agree with your terms',
            value: false
        }
    },
    layout: ['title', ['size', 'color'], 'type', 'agree']
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

![](https://raw.githubusercontent.com/naguvan/react-mst-form/master/demo/form.png)
