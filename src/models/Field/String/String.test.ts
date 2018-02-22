import { String } from './String';
import { IStringConfig } from '@root/types';

const config: IStringConfig = {
    title: 'naguvan',
    value: 'sk.sk',
    type: 'string',
    minLength: 4,
    maxLength: 6
};

test('create string field', () => {
    const field = String.create(config);

    expect(field.type).toBe('string');
    expect(field.title).toBe('naguvan');
    expect(field.value).toBe('sk.sk');
    expect(field.minLength).toBe(4);
});

test('change string value', () => {
    const field = String.create(config);

    field.setValue('rust');
    expect(field.value).toBe('rust');
});

test('validate minLength valid', async () => {
    const field = String.create(config);

    field.setValue('java');
    expect(field.value).toBe('java');

    await field.validate();

    expect(field.valid).toBe(true);
    expect(field.errors.slice(0)).toEqual([]);
});

test('validate minLength invalid', async () => {
    const field = String.create(config);

    field.setValue('js');
    expect(field.value).toBe('js');

    await field.validate();

    expect(field.valid).toBe(false);
    expect(field.errors.slice(0)).toEqual([
        'should NOT be shorter than 4 characters'
    ]);
});

test('validate maxLength valid', async () => {
    const field = String.create(config);

    field.setValue('java');
    expect(field.value).toBe('java');

    await field.validate();

    expect(field.valid).toBe(true);
    expect(field.errors.slice(0)).toEqual([]);
});

test('validate maxLength invalid', async () => {
    const field = String.create(config);

    field.setValue('typescript');
    expect(field.value).toBe('typescript');

    await field.validate();

    expect(field.valid).toBe(false);
    expect(field.errors.slice(0)).toEqual([
        'should NOT be longer than 6 characters'
    ]);
});

test('test invalid pattern configuration', () => {
    expect(() =>
        String.create({
            ...config,
            pattern: '$%#%^%'
        })
    ).toThrowError(`pattern '$%#%^%' is invalid.`);
});

test('test valid pattern', async () => {
    const field = String.create({
        ...config,
        maxLength: 8,
        minLength: 8,
        pattern: '/^(2[0-4]|[01][0-9]):([0-5][0-9]):(60|[0-5][0-9])$/'
    });

    field.setValue('23:05:56');
    expect(field.value).toBe('23:05:56');

    await field.validate();

    expect(field.valid).toBe(true);
    expect(field.errors.slice(0)).toEqual([]);
});

test('test invalid pattern', async () => {
    const field = String.create({
        ...config,
        maxLength: 8,
        minLength: 8,
        pattern: '/^(2[0-4]|[01][0-9]):([0-5][0-9]):(60|[0-5][0-9])$/'
    });

    field.setValue('26:25:56');
    expect(field.value).toBe('26:25:56');

    await field.validate();

    expect(field.valid).toBe(false);
    expect(field.errors.slice(0)).toEqual([
        'should match pattern /^(2[0-4]|[01][0-9]):([0-5][0-9]):(60|[0-5][0-9])$/'
    ]);
});
