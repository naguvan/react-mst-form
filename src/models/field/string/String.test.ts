import { String } from './String';
import { IStringConfig } from '@root/types';

const config: IStringConfig = {
    title: 'naguvan',
    value: 'sk',
    type: 'string',
    minLength: 15
};

test('create string field', () => {
    const field = String.create(config);

    expect(field.type).toBe('string');
    expect(field.title).toBe('naguvan');
    expect(field.value).toBe('sk');
    expect(field.minLength).toBe(15);
});

test('change string value', () => {
    const field = String.create(config);

    field.setValue('senthilnathan');
    expect(field.value).toBe('senthilnathan');
});
