import { TypeField } from './TypeField';

test('create type field', () => {
    const field = TypeField.create({
        title: 'naguvan',
        value: true,
        type: 'boolean'
    });
    expect(field.type).toBe('boolean');
    expect(field.title).toBe('naguvan');
    expect(field.name).toBe(field.title);
    expect(field.value).toBe(true);
});

test('change type name', () => {
    const field = TypeField.create({
        title: 'naguvan',
        value: true,
        type: 'boolean'
    });

    field.setName('senthilnathan');
    expect(field.name).toBe('senthilnathan');
});
