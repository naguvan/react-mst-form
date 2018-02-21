import { Enum } from './Enum';
import { IEnumConfig } from '@root/types';

const config: IEnumConfig = {
    title: 'naguvan',
    value: '1',
    type: 'enum',
    options: [{ label: 'One', value: '1' }, { label: 'Two', value: '2' }]
};

test('create enum field', () => {
    const field = Enum.create(config);

    expect(field.type).toBe('enum');
    expect(field.title).toBe('naguvan');
    expect(field.value).toBe('1');
    expect(field.options.slice(0)).toEqual([
        { label: 'One', value: '1' },
        { label: 'Two', value: '2' }
    ]);
});

test('change enum value', () => {
    const field = Enum.create(config);

    field.setValue('senthilnathan');
    expect(field.value).toBe('senthilnathan');
});
