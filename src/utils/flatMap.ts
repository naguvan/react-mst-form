export function flatMap<T, U>(
    array: Array<T>,
    mapper: (value: T, index: number, array: Array<T>) => Array<U>
): Array<U> {
    return ([] as Array<U>).concat(...array.map(mapper));
}
