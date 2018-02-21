import { Number } from './Number';
import { MAX_SAFE_INTEGER, MIN_SAFE_INTEGER } from '../../../utils';

test('create number field', () => {
    const field = Number.create({
        title: 'naguvan',
        value: 50,
        type: 'number'
    });
    expect(field.type).toBe('number');
    expect(field.title).toBe('naguvan');
    expect(field.value).toBe(50);
    expect(field.minimum).toBe(MIN_SAFE_INTEGER);
    expect(field.maximum).toBe(MAX_SAFE_INTEGER);
});

test('change number name field', () => {
    const field = Number.create({
        title: 'naguvan',
        value: 50,
        type: 'number'
    });
    field.setName('senthilnathan');
    expect(field.name).toBe('senthilnathan');
});
