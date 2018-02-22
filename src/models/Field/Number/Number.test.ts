import { Number } from './Number';
import { INumberConfig } from '@root/types';
import { MAX_SAFE_INTEGER, MIN_SAFE_INTEGER } from '../../../utils';

const config: INumberConfig = {
    title: 'naguvan',
    value: 50,
    type: 'number'
};

test('create number field', () => {
    const field = Number.create(config);
    expect(field.type).toBe('number');
    expect(field.title).toBe('naguvan');
    expect(field.value).toBe(50);
    expect(field.minimum).toBe(MIN_SAFE_INTEGER);
    expect(field.maximum).toBe(MAX_SAFE_INTEGER);
});

test('change number name field', () => {
    const field = Number.create(config);
    field.setName('senthilnathan');
    expect(field.name).toBe('senthilnathan');
});

test('validate minimum valid', async () => {
    const field = Number.create({ ...config, minimum: 10 });

    field.setValue(12);
    expect(field.value).toBe(12);

    await field.validate();

    expect(field.valid).toBe(true);
    expect(field.errors.slice(0)).toEqual([]);
});

test('validate minimum invalid', async () => {
    const field = Number.create({ ...config, minimum: 10 });

    field.setValue(5);
    expect(field.value).toBe(5);

    await field.validate();

    expect(field.valid).toBe(false);
    expect(field.errors.slice(0)).toEqual(['should NOT be lesser than 10']);
});

test('validate maximum valid', async () => {
    const field = Number.create({ ...config, maximum: 10 });

    field.setValue(5);
    expect(field.value).toBe(5);

    await field.validate();

    expect(field.valid).toBe(true);
    expect(field.errors.slice(0)).toEqual([]);
});

test('validate maximum invalid', async () => {
    const field = Number.create({ ...config, maximum: 10 });

    field.setValue(15);
    expect(field.value).toBe(15);

    await field.validate();

    expect(field.valid).toBe(false);
    expect(field.errors.slice(0)).toEqual(['should NOT be greater than 10']);
});

test('test invalid multipleOf configuration', () => {
    expect(() =>
        Number.create({
            ...config,
            multipleOf: 0
        })
    ).toThrowError(`multipleOf can not be zero`);

    expect(() =>
        Number.create({
            ...config,
            multipleOf: -10
        })
    ).toThrowError(`multipleOf can not be negative`);
});

test('validate multipleOf valid', async () => {
    const field = Number.create({ ...config, multipleOf: 3 });

    field.setValue(27);
    expect(field.value).toBe(27);

    await field.validate();

    expect(field.valid).toBe(true);
    expect(field.errors.slice(0)).toEqual([]);
});

test('validate multipleOf invalid', async () => {
    const field = Number.create({ ...config, multipleOf: 3 });

    field.setValue(29);
    expect(field.value).toBe(29);

    await field.validate();

    expect(field.valid).toBe(false);
    expect(field.errors.slice(0)).toEqual(['should be multiple of 3']);
});

test('validate const valid', async () => {
    const field = Number.create({ ...config, const: 5 });

    field.setValue(5);
    expect(field.value).toBe(5);

    await field.validate();

    expect(field.valid).toBe(true);
    expect(field.errors.slice(0)).toEqual([]);
});

test('validate const invalid', async () => {
    const field = Number.create({ ...config, const: 5 });

    field.setValue(10);
    expect(field.value).toBe(10);

    await field.validate();

    expect(field.valid).toBe(false);
    expect(field.errors.slice(0)).toEqual(['should be equal to 5']);
});

test('validate enum valid', async () => {
    const field = Number.create({ ...config, enum: [5, 10] });

    field.setValue(5);
    expect(field.value).toBe(5);

    await field.validate();

    expect(field.valid).toBe(true);
    expect(field.errors.slice(0)).toEqual([]);
});

test('validate enum invalid', async () => {
    const field = Number.create({ ...config, enum: [5, 20] });

    field.setValue(10);
    expect(field.value).toBe(10);

    await field.validate();

    expect(field.valid).toBe(false);
    expect(field.errors.slice(0)).toEqual([
        'should be equal to one of the allowed values [5,20]'
    ]);
});