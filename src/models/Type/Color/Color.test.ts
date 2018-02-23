import { Color } from './Color';

test('create color type', () => {
    const type = Color.create({
        title: 'naguvan',
        value: '#EDFC',
        type: 'color'
    });
    expect(type.type).toBe('color');
    expect(type.title).toBe('naguvan');
    expect(type.value).toBe('#EDFC');
});

test('change color name type', () => {
    const type = Color.create({
        title: 'naguvan',
        value: '#EDFC',
        type: 'color'
    });
    type.setName('senthilnathan');
    expect(type.name).toBe('senthilnathan');
});
