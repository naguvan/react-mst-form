import { String } from './String';
import { IStringConfig } from '@root/types';

const config: IStringConfig = {
    title: 'naguvan',
    value: 'sk',
    type: 'string',
    minLength: 2
};

test('create string field', () => {
    const field = String.create(config);

    expect(field.type).toBe('string');
    expect(field.title).toBe('naguvan');
    expect(field.value).toBe('sk');
    expect(field.minLength).toBe(2);
});

test('change string value', () => {
    const field = String.create(config);

    field.setValue('senthilnathan');
    expect(field.value).toBe('senthilnathan');
});

test('validate minLength valid', async () => {
    const field = String.create(config);

    await field.validate();

    expect(field.valid).toBe(true);
    expect(field.errors.slice(0)).toEqual([]);
});

test('validate minLength invalid', async () => {
    const field = String.create(config);

    field.setValue('s');
    expect(field.value).toBe('s');

    await field.validate();

    expect(field.valid).toBe(false);
    expect(field.errors.slice(0)).toEqual([
        'should NOT be shorter than 2 characters'
    ]);
});
