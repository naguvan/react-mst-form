import { Boolean } from './Boolean';

test('create boolean type', () => {
    const type = Boolean.create({
        title: 'naguvan',
        value: true,
        type: 'boolean'
    });
    expect(type.type).toBe('boolean');
    expect(type.title).toBe('naguvan');
    expect(type.value).toBe(true);

});

test('change boolean name type', () => {
    const type = Boolean.create({
        title: 'naguvan',
        value: true,
        type: 'boolean'
    });
    type.setName('senthilnathan');
    expect(type.name).toBe('senthilnathan');
});
