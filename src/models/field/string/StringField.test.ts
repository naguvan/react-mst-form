import { StringField } from './StringField';
import { IStringFieldConfig } from '@root/types';

const config: IStringFieldConfig = {
    title: 'naguvan',
    value: 'sk',
    type: 'string',
    minLength: 15
};

test('create string field', () => {
    const field = StringField.create(config);

    expect(field.type).toBe('string');
    expect(field.title).toBe('naguvan');
    expect(field.value).toBe('sk');
    expect(field.minLength).toBe(15);
});

test('change string value', () => {
    const field = StringField.create(config);

    field.setValue('senthilnathan');
    expect(field.value).toBe('senthilnathan');
});
