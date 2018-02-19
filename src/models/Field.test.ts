import { create } from './Field';
import { ITypeField, IStringField, INumberField } from '../types/Field';

test('create string field', () => {
    const field = create({
        title: 'naguvan',
        value: 'sk',
        type: 'string',
        minLength: 4
    }) as IStringField;
    expect(field.type).toBe('string');
    expect(field.title).toBe('naguvan');
    expect(field.value).toBe('sk');
    expect(field.minLength).toBe(4);
});

test('create number field', () => {
    const field = create({
        title: 'naguvan',
        value: 50,
        type: 'number'
    }) as INumberField;
    expect(field.type).toBe('number');
    expect(field.title).toBe('naguvan');
    expect(field.value).toBe(50);
});

test('create type field', () => {
    const field = create({
        title: 'naguvan',
        value: true,
        type: 'boolean'
    });
    expect(field.type).toBe('boolean');
    expect(field.title).toBe('naguvan');
    expect(field.name).toBe(field.title);
    expect(field.value).toBe(true);
});
