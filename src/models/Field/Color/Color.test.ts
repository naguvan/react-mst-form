import { Color } from './Color';

test('create color field', () => {
    const field = Color.create({
        title: 'naguvan',
        value: '#EDFC',
        type: 'color'
    });
    expect(field.type).toBe('color');
    expect(field.title).toBe('naguvan');
    expect(field.value).toBe('#EDFC');
});

test('change color name field', () => {
    const field = Color.create({
        title: 'naguvan',
        value: '#EDFC',
        type: 'color'
    });
    field.setName('senthilnathan');
    expect(field.name).toBe('senthilnathan');
});
