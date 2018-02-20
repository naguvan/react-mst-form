import { Form } from './Form';
import { IFieldConfig, IField } from '../types/Field';
import { IStringFieldConfig, IStringField } from '../types/Field';
import { INumberFieldConfig, INumberField } from '../types/Field';
import { IBooleanFieldConfig, IBooleanField } from '../types/Field';
import { getSnapshot } from 'mobx-state-tree';
import { IFormConfig, IForm } from '../types/Form';

import { StringField } from './StringField';
import { NumberField } from './NumberField';
import { BooleanField } from './BooleanField';

const name: IStringFieldConfig = {
    title: 'Name',
    value: 'sk',
    type: 'string',
    minLength: 5
};

const age: INumberFieldConfig = {
    title: 'Age',
    value: 1,
    type: 'number',
    maximum: 10,
    minimum: 0
};

const boy: IBooleanFieldConfig = {
    title: 'Boy?',
    value: true,
    type: 'boolean'
};

test('create form', () => {
    const form = Form.create({
        title: 'Test Form',
        properties: {
            name,
            age,
            boy
        },
        layout: ['name', 'age', ['boy']]
    });

    // console.info(getSnapshot(form));

    expect(form.title).toBe('Test Form');
    expect(form.errors.length).toBe(0);
    expect(form.valid).toBe(true);
    expect(form.modified).toBe(false);
    expect(form.validating).toBe(false);

    expect(form.get('name')!.value).toBe('sk');
    expect(form.get('name')!.name).toBe('name');
    expect(StringField.is(form.get('name'))).toBe(true);

    expect(form.get('age')!.value).toBe(1);
    expect(form.get('age')!.name).toBe('age');
    expect(NumberField.is(form.get('age'))).toBe(true);

    expect(form.get('boy')!.value).toBe(true);
    expect(form.get('boy')!.name).toBe('boy');
    expect(BooleanField.is(form.get('boy'))).toBe(true);

    expect(form.fields.length).toBe(3);
    expect(form.values).toEqual({ name: 'sk', age: 1, boy: true });

    expect(form.layout).toEqual(['name', 'age', ['boy']]);

    expect(form.layout).toContain('age');
});

test('test form layout single mis-configuration error', () => {
    expect(() =>
        Form.create({
            title: 'Test Form',
            properties: {
                name
            },
            layout: ['name', 'age']
        })
    ).toThrowError(`['age'] layout field is not configured.`);
});

test('test form layout multi mis-configuration error', () => {
    expect(() =>
        Form.create({
            title: 'Test Form',
            properties: {
                name,
                a: age,
                b: boy
            },
            layout: ['name', 'age', ['boy']]
        })
    ).toThrowError(`['age', 'boy'] layout fields are not configured.`);
});

test('test field modification', () => {
    const form = Form.create({
        title: 'Test Form',
        properties: {
            name
        },
        layout: ['name']
    });

    expect(form.title).toBe('Test Form');
    expect(form.modified).toBe(false);
    expect(form.values).toEqual({ name: 'sk' });

    const fname = form.get('name') as IStringField;
    fname!.setValue('senthilnathan');

    expect(form.modified).toBe(true);
    expect(form.values).toEqual({ name: 'senthilnathan' });

    fname!.reset();
    expect(form.modified).toBe(false);
    expect(form.values).toEqual({ name: 'sk' });
});

test('test field error', () => {
    const form = Form.create({
        title: 'Test Form',
        properties: {
            name
        },
        layout: ['name']
    });

    expect(form.title).toBe('Test Form');
    expect(form.valid).toBe(true);
    expect(form.fieldErrors).toEqual({ name: [] });

    const fname = form.get('name') as IStringField;
    fname!.addError('testing field error');

    expect(form.valid).toBe(false);
    expect(form.fieldErrors).toEqual({ name: ['testing field error'] });

    fname!.reset();
    expect(form.valid).toBe(true);
    expect(form.fieldErrors).toEqual({ name: [] });
});

test('test field validating', async () => {
    const form = Form.create({
        title: 'Test Form',
        properties: {
            name
        },
        layout: ['name']
    });

    expect(form.title).toBe('Test Form');
    expect(form.validating).toBe(false);

    const fname = form.get('name') as IStringField;

    const validate = fname.validate();
    expect(form.validating).toBe(true);

    await validate;
    expect(form.validating).toBe(false);
});
