import { Form } from './Form';
import { ITypeFieldConfig, ITypeField } from '../types/Field';
import { IStringFieldConfig, IStringField } from '../types/Field';
import { INumberFieldConfig, INumberField } from '../types/Field';
import { IFormConfig, IForm } from '../types/Form';

test('create form', () => {
    const config: IFormConfig = {
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
    };

    const form = Form.create(config);
    console.info(form);
    expect(form.fields.length).toBe(0);
});
