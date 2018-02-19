import { NumberField } from './NumberField';

test('create number field', () => {
    const field = NumberField.create({
        title: 'naguvan',
        value: 50,
        type: 'number'
    });
    expect(field.type).toBe('number');
    expect(field.title).toBe('naguvan');
    expect(field.value).toBe(50);
    expect(field.minimum).toBe(Number.MIN_SAFE_INTEGER);
    expect(field.maximum).toBe(Number.MAX_SAFE_INTEGER);

    field.setName('senthilnathan');
    expect(field.name).toBe('senthilnathan');
});

test('change number name field', () => {
    const field = NumberField.create({
        title: 'naguvan',
        value: 50,
        type: 'number'
    });
    field.setName('senthilnathan');
    expect(field.name).toBe('senthilnathan');
});
