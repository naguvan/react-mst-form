import { isArray } from './common';

export function flatArray<T extends string | object | Array<T>>(
    array: Array<T>
): Array<T> {
    return array.reduce(
        (values: Array<T>, vs) => [...values, ...(isArray(vs) ? vs : [vs])],
        [] as Array<T>
    );
}
