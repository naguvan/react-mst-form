import { types } from 'mobx-state-tree';
import { IValueConfig, IValue } from '@root/types';
import { create } from '../value/Value';

const config: IValueConfig<boolean> = {
    title: 'naguvan',
    value: true,
    type: 'boolean'
};

const ValueField = create<boolean>('boolean', types.boolean, false);

test('create type field', () => {
    const field = ValueField.create(config);
    expect(field.type).toBe('boolean');
    expect(field.title).toBe('naguvan');
    expect(field.name).toBe(field.title);
    expect(field.value).toBe(true);
    expect(field.initial).toBe(true);
    expect(field.modified).toBe(false);

    expect(field.required).toBe(false);
    expect(field.disabled).toBe(false);
    expect(field.visible).toBe(true);
    expect(field.validating).toBe(false);
    expect(field.errors.length).toBe(0);
});

test('change type value', () => {
    const field = ValueField.create({ ...config, value: false });

    expect(field.value).toBe(false);
    expect(field.initial).toBe(false);
    expect(field.modified).toBe(false);

    field.setValue(true);
    expect(field.value).toBe(true);
    expect(field.initial).toBe(false);
    expect(field.modified).toBe(true);

    field.reset();
    expect(field.value).toBe(false);
    expect(field.modified).toBe(false);
});

test('change type name', () => {
    const field = ValueField.create(config);

    field.setName('senthilnathan');
    expect(field.name).toBe('senthilnathan');
});

test('change required property', () => {
    const field = ValueField.create(config);

    expect(field.required).toBe(false);

    field.setRequired(true);
    expect(field.required).toBe(true);
});

test('change disabled property', () => {
    const field = ValueField.create({ ...config, disabled: true });

    expect(field.disabled).toBe(true);

    field.setDisabled(false);
    expect(field.disabled).toBe(false);
});

test('change visible property', () => {
    const field = ValueField.create({ ...config, visible: false });

    expect(field.visible).toBe(false);

    field.setDisabled(false);
    expect(field.visible).toBe(false);

    field.setVisible(true);
    expect(field.visible).toBe(true);
});

test('change error property', () => {
    const field = ValueField.create(config);

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
    const field = ValueField.create(config);

    expect(field.validating).toBe(false);

    const validate = field.validate();
    expect(field.validating).toBe(true);

    await validate;
    expect(field.validating).toBe(false);
});
