import create from './Object';
import { ITypeConfig, IObjectConfig, IObject } from '@root/types';
import { toJS } from 'mobx';
import { keys } from '../../../utils';
import { getSnapshot } from 'mobx-state-tree';

const config: IObjectConfig = {
    type: 'object',
    properties: {
        name: {
            title: 'name',
            value: 'naguvan',
            type: 'string'
        },
        age: {
            title: 'age',
            value: 1,
            type: 'number'
        }
    },
    title: 'naguvan'
};

const NObject = create();

test('create object type', () => {
    const type = NObject.create(config);
    expect(type.type).toBe('object');
    expect(type.title).toBe('naguvan');
    expect(type.value).toBeNull();
    expect(type.additionalProperties).toBeNull();
    expect(type.maxProperties).toBeNull();
    expect(type.minProperties).toBeNull();

    expect(type.properties).not.toBeNull();
    expect(keys(toJS(type.properties!)).length).toBe(2);
    expect(keys(toJS(type.properties!))).toEqual(['name', 'age']);

    expect(type.properties!.get('name')!.title).toBe('name');
    expect(type.properties!.get('name')!.value).toBe('naguvan');
    expect(type.properties!.get('name')!.type).toBe('string');

    expect(type.properties!.get('age')!.title).toBe('age');
    expect(type.properties!.get('age')!.value).toBe(1);
    expect(type.properties!.get('age')!.type).toBe('number');

    // console.info(getSnapshot(type));
    // console.info(getSnapshot(city));
});

test('nested object type', () => {
    const type = NObject.create({
        type: 'object',
        properties: {
            city: {
                type: 'object',
                properties: {
                    name: {
                        title: 'name',
                        value: 'chennai',
                        type: 'string'
                    }
                },
                title: 'city'
            }
        },
        title: 'naguvan'
    });

    const city: IObject = type.properties!.get('city')! as IObject;
    expect(city).not.toBeNull();
    expect(city.title).toBe('city');
    expect(city.properties!.get('name')!.title).toBe('name');
    expect(city.properties!.get('name')!.value).toBe('chennai');
    expect(city.properties!.get('name')!.type).toBe('string');
});

test('validate null object value', async () => {
    const type = NObject.create({ ...config, value: null });
    expect(type.value).toBe(null);
});

test('test invalid minProperties configuration', () => {
    expect(() =>
        NObject.create({
            ...config,
            minProperties: -10
        })
    ).toThrowError(`minProperties can not be negative`);
});

test('test invalid maxProperties configuration', () => {
    expect(() =>
        NObject.create({
            ...config,
            maxProperties: -10
        })
    ).toThrowError(`maxProperties can not be negative`);
});

// test('validate minProperties valid', async () => {
//     const type = NObject.create({ ...config, minProperties: 2 });

//     type.setValue({name: 'naguvan', age: 1});
//     expect(toJS(type.value)).toEqual({ name: 'naguvan', age: 1 });

//     await type.validate();

//     expect(type.valid).toBe(true);
//     expect(type.errors.slice(0)).toEqual([]);
// });

// test('validate minimum invalid', async () => {
//     const type = Object.create({ ...config, minimum: 10 });

//     type.setValue(5);
//     expect(type.value).toBe(5);

//     await type.validate();

//     expect(type.valid).toBe(false);
//     expect(type.errors.slice(0)).toEqual(['should NOT be lesser than 10']);
// });

// test('validate maximum valid', async () => {
//     const type = Object.create({ ...config, maximum: 10 });

//     type.setValue(5);
//     expect(type.value).toBe(5);

//     await type.validate();

//     expect(type.valid).toBe(true);
//     expect(type.errors.slice(0)).toEqual([]);
// });

// test('validate maximum invalid', async () => {
//     const type = Object.create({ ...config, maximum: 10 });

//     type.setValue(15);
//     expect(type.value).toBe(15);

//     await type.validate();

//     expect(type.valid).toBe(false);
//     expect(type.errors.slice(0)).toEqual(['should NOT be greater than 10']);
// });

// test('validate multipleOf valid', async () => {
//     const type = Object.create({ ...config, multipleOf: 3 });

//     type.setValue(27);
//     expect(type.value).toBe(27);

//     await type.validate();

//     expect(type.valid).toBe(true);
//     expect(type.errors.slice(0)).toEqual([]);
// });

// test('validate multipleOf invalid', async () => {
//     const type = Object.create({ ...config, multipleOf: 3 });

//     type.setValue(29);
//     expect(type.value).toBe(29);

//     await type.validate();

//     expect(type.valid).toBe(false);
//     expect(type.errors.slice(0)).toEqual(['should be multiple of 3']);
// });

// test('validate const valid', async () => {
//     const type = Object.create({ ...config, const: 5 });

//     type.setValue(5);
//     expect(type.value).toBe(5);

//     await type.validate();

//     expect(type.valid).toBe(true);
//     expect(type.errors.slice(0)).toEqual([]);
// });

// test('validate const invalid', async () => {
//     const type = Object.create({ ...config, const: 5 });

//     type.setValue(10);
//     expect(type.value).toBe(10);

//     await type.validate();

//     expect(type.valid).toBe(false);
//     expect(type.errors.slice(0)).toEqual(['should be equal to 5']);
// });

// test('validate enum valid', async () => {
//     const type = Object.create({ ...config, enum: [5, 10] });

//     type.setValue(5);
//     expect(type.value).toBe(5);

//     await type.validate();

//     expect(type.valid).toBe(true);
//     expect(type.errors.slice(0)).toEqual([]);
// });

// test('validate enum invalid', async () => {
//     const type = Object.create({ ...config, enum: [5, 20] });

//     type.setValue(10);
//     expect(type.value).toBe(10);

//     await type.validate();

//     expect(type.valid).toBe(false);
//     expect(type.errors.slice(0)).toEqual([
//         'should be equal to one of the allowed values [5,20]'
//     ]);
// });
