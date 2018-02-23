import { Type } from './Type';
import { IValue, IString, INumber } from '@root/types';

test('create string type ', () => {
    const type  = Type.create({
        title: 'naguvan',
        value: 'sk',
        type: 'string',
        minLength: 4
    }) as IString;
    expect(type .type).toBe('string');
    expect(type .title).toBe('naguvan');
    expect(type .value).toBe('sk');
    expect(type .minLength).toBe(4);
});

test('create number type ', () => {
    const type  = Type.create({
        title: 'naguvan',
        value: 50,
        type: 'number'
    }) as INumber;
    expect(type .type).toBe('number');
    expect(type .title).toBe('naguvan');
    expect(type .value).toBe(50);
});

test('create boolean type ', () => {
    const type  = Type.create({
        title: 'naguvan',
        value: true,
        type: 'boolean'
    });
    expect(type .type).toBe('boolean');
    expect(type .title).toBe('naguvan');
    expect(type .name).toBe(type .title);
    expect(type .value).toBe(true);
});

test('create color type ', () => {
    const type  = Type.create({
        title: 'naguvan',
        value: '#EDFC',
        type: 'color'
    });
    expect(type .type).toBe('color');
    expect(type .title).toBe('naguvan');
    expect(type .value).toBe('#EDFC');
});
