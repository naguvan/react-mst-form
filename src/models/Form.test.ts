import { Form } from './Form';
import { ITypeFieldConfig, ITypeField } from '../types/Field';
import { IStringFieldConfig, IStringField } from '../types/Field';
import { INumberFieldConfig, INumberField } from '../types/Field';
import { getSnapshot } from 'mobx-state-tree';
// import { IFormConfig, IForm } from '../types/Form';

import { StringField } from './StringField';
import { NumberField } from './NumberField';

test('create form', () => {
    const form = Form.create({
        properties: {
            age: {
                title: 'naguvan',
                value: 1,
                type: 'number'
            } as INumberFieldConfig,
            name: {
                title: 'naguvan',
                value: 'sk',
                type: 'string',
                minLength: 15
            } as IStringFieldConfig
        },
        layout: ['age', 'name']
    });
    console.info(getSnapshot(form));
    expect(form.properties.get('age')!.value).toBe(1);
    expect(NumberField.is(form.properties.get('age'))).toBe(true);

    expect(form.properties.get('name')!.value).toBe('sk');
    expect(StringField.is(form.properties.get('name'))).toBe(true);
});
