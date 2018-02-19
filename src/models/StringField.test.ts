import { StringField } from './StringField';

test('create string field', () => {
    const field = StringField.create({
        title: 'naguvan',
        value: 'sk',
        type: 'string',
        minLength: 15
    });
    expect(field.type).toBe('string');
    expect(field.title).toBe('naguvan');
    expect(field.value).toBe('sk');
    expect(field.minLength).toBe(15);
});

test('change string value', () => {
    const field = StringField.create({
        title: 'naguvan',
        value: 'sk',
        type: 'string',
        minLength: 4
    });

    field.setValue('senthilnathan');
    expect(field.value).toBe('senthilnathan');
});
