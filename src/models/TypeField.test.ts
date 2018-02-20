import { ITypeFieldConfig, ITypeField } from '../types/Field';
import { TypeField } from './TypeField';

const config: ITypeFieldConfig<'boolean', boolean> = {
    title: 'naguvan',
    type: 'boolean'
};

test('create type field', () => {
    const field = TypeField.create(config);
    expect(field.type).toBe('boolean');
    expect(field.title).toBe('naguvan');
    expect(field.name).toBe(field.title);

    expect(field.required).toBe(false);
    expect(field.disabled).toBe(false);
    expect(field.visible).toBe(true);
    expect(field.error).toBe('');
});

test('change type name', () => {
    const field = TypeField.create(config);

    field.setName('senthilnathan');
    expect(field.name).toBe('senthilnathan');
});

test('change required property', () => {
    const field = TypeField.create(config);

    expect(field.required).toBe(false);
    field.setRequired(true);
    expect(field.required).toBe(true);
});

test('change disabled property', () => {
    const field = TypeField.create({ ...config, disabled: true });

    expect(field.disabled).toBe(true);
    field.setDisabled(false);
    expect(field.disabled).toBe(false);
});

test('change visible property', () => {
    const field = TypeField.create({ ...config, visible: false });

    expect(field.visible).toBe(false);
    field.setDisabled(false);
    expect(field.visible).toBe(false);
    field.setVisible(true);
    expect(field.visible).toBe(true);
});

test('change error property', () => {
    const field = TypeField.create(config);

    expect(field.error).toBe('');
    field.setError('this field has some error');
    expect(field.error).toBe('this field has some error');
});
