import { Form } from './Form';
import { ITypeFieldConfig, ITypeField } from '../types/Field';
import { IStringFieldConfig, IStringField } from '../types/Field';
import { INumberFieldConfig, INumberField } from '../types/Field';
import { getSnapshot } from 'mobx-state-tree';
import { IFormConfig, IForm } from '../types/Form';

import { StringField } from './StringField';
import { NumberField } from './NumberField';

test('create form', () => {
    const form = Form.create({
        properties: {
            name: {
                title: 'naguvan',
                value: 'sk',
                type: 'string',
                minLength: 15
            },
            age: {
                title: 'naguvan',
                value: 1,
                type: 'number'
            },
            boy: {
                title: 'boy',
                value: true,
                type: 'boolean'
            }
        },
        layout: ['name', 'age', ['boy']]
    });
    // console.info(getSnapshot(form));

    expect(form.get('name')!.value).toBe('sk');
    expect(StringField.is(form.get('name'))).toBe(true);

    expect(form.get('age')!.value).toBe(1);
    expect(NumberField.is(form.get('age'))).toBe(true);

    expect(form.fields.length).toBe(3);
    expect(form.values).toEqual({ name: 'sk', age: 1, boy: true });

    expect(form.layout).toEqual(['name', 'age', ['boy']]);
});
