import { Field } from './Field';
import { IValue, IString, INumber } from '@root/types';

test('create string field', () => {
    const field = Field.create({
        title: 'naguvan',
        value: 'sk',
        type: 'string',
        minLength: 4
    }) as IString;
    expect(field.type).toBe('string');
    expect(field.title).toBe('naguvan');
    expect(field.value).toBe('sk');
    expect(field.minLength).toBe(4);
});

test('create number field', () => {
    const field = Field.create({
        title: 'naguvan',
        value: 50,
        type: 'number'
    }) as INumber;
    expect(field.type).toBe('number');
    expect(field.title).toBe('naguvan');
    expect(field.value).toBe(50);
});

test('create boolean field', () => {
    const field = Field.create({
        title: 'naguvan',
        value: true,
        type: 'boolean'
    });
    expect(field.type).toBe('boolean');
    expect(field.title).toBe('naguvan');
    expect(field.name).toBe(field.title);
    expect(field.value).toBe(true);
});

test('create color field', () => {
    const field = Field.create({
        title: 'naguvan',
        value: '#EDFC',
        type: 'color'
    });
    expect(field.type).toBe('color');
    expect(field.title).toBe('naguvan');
    expect(field.value).toBe('#EDFC');
});

test('create enum field', () => {
    const field = Field.create({
        title: 'naguvan',
        value: 'sk',
        type: 'enum',
        options: [{ label: 'One', value: '1' }, { label: 'Two', value: '2' }]
    });

    expect(field.type).toBe('enum');
    expect(field.title).toBe('naguvan');
    expect(field.value).toBe('sk');
});