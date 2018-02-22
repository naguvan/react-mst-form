import { types } from 'mobx-state-tree';
import { IValueConfig, IValue } from '@root/types';
import { create } from './Value';

const config: IValueConfig<number> = {
    title: 'naguvan',
    value: 10,
    type: 'number'
};

const Value = create<number>('number', types.number, 0);

test('create type field', () => {
    const field = Value.create(config);
    expect(field.type).toBe('number');
    expect(field.title).toBe('naguvan');
    expect(field.name).toBe(field.title);
    expect(field.value).toBe(10);
    expect(field.initial).toBe(10);
    expect(field.modified).toBe(false);

    expect(field.required).toBe(false);
    expect(field.disabled).toBe(false);
    expect(field.visible).toBe(true);
    expect(field.validating).toBe(false);
    expect(field.errors.length).toBe(0);
});

test('change type value', () => {
    const field = Value.create({ ...config, value: 20 });

    expect(field.value).toBe(20);
    expect(field.initial).toBe(20);
    expect(field.modified).toBe(false);

    field.setValue(30);
    expect(field.value).toBe(30);
    expect(field.initial).toBe(20);
    expect(field.modified).toBe(true);

    field.reset();
    expect(field.value).toBe(20);
    expect(field.modified).toBe(false);
});

test('change type name', () => {
    const field = Value.create(config);

    field.setName('skclusive');
    expect(field.name).toBe('skclusive');
});

test('change required property', () => {
    const field = Value.create(config);

    expect(field.required).toBe(false);

    field.setRequired(true);
    expect(field.required).toBe(true);
});

test('change disabled property', () => {
    const field = Value.create({ ...config, disabled: true });

    expect(field.disabled).toBe(true);

    field.setDisabled(false);
    expect(field.disabled).toBe(false);
});

test('change visible property', () => {
    const field = Value.create({ ...config, visible: false });

    expect(field.visible).toBe(false);

    field.setDisabled(false);
    expect(field.visible).toBe(false);

    field.setVisible(true);
    expect(field.visible).toBe(true);
});

test('change error property', () => {
    const field = Value.create(config);

    expect(field.errors.length).toBe(0);
    expect(field.valid).toBe(true);

    field.addError('this field has some error');
    expect(field.errors.slice(0)).toEqual(['this field has some error']);
    expect(field.valid).toBe(false);

    field.reset();
    expect(field.errors.length).toBe(0);
    expect(field.valid).toBe(true);
});

test('check validating property', async () => {
    const field = Value.create(config);

    expect(field.validating).toBe(false);

    const validate = field.validate();
    expect(field.validating).toBe(true);

    await validate;
    expect(field.validating).toBe(false);
});

test('validate const valid', async () => {
    const field = Value.create({ ...config, const: 5 });

    field.setValue(5);
    expect(field.value).toBe(5);

    await field.validate();

    expect(field.valid).toBe(true);
    expect(field.errors.slice(0)).toEqual([]);
});

test('validate const invalid', async () => {
    const field = Value.create({ ...config, const: 5 });

    field.setValue(10);
    expect(field.value).toBe(10);

    await field.validate();

    expect(field.valid).toBe(false);
    expect(field.errors.slice(0)).toEqual(['should be equal to 5']);
});

test('validate enum valid', async () => {
    const field = Value.create({ ...config, enum: [5, 10] });

    field.setValue(5);
    expect(field.value).toBe(5);

    await field.validate();

    expect(field.valid).toBe(true);
    expect(field.errors.slice(0)).toEqual([]);
});

test('validate enum invalid', async () => {
    const field = Value.create({ ...config, enum: [5, 20] });

    field.setValue(10);
    expect(field.value).toBe(10);

    await field.validate();

    expect(field.valid).toBe(false);
    expect(field.errors.slice(0)).toEqual([
        'should be equal to one of the allowed values [5,20]'
    ]);
});