import { Boolean } from './Boolean';

test('create number field', () => {
    const field = Boolean.create({
        title: 'naguvan',
        value: true,
        type: 'boolean'
    });
    expect(field.type).toBe('boolean');
    expect(field.title).toBe('naguvan');
    expect(field.value).toBe(true);

});

test('change number name field', () => {
    const field = Boolean.create({
        title: 'naguvan',
        value: true,
        type: 'boolean'
    });
    field.setName('senthilnathan');
    expect(field.name).toBe('senthilnathan');
});
