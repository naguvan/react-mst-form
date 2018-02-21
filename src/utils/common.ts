export const INFINITY = 1 / 0;

export const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER; // 9007199254740991;

export const MIN_SAFE_INTEGER = Number.MIN_SAFE_INTEGER;

export function toString(value: any): string {
    return Object.prototype.toString.call(value);
}

export function keys(value: object): Array<string> {
    return Object.keys(value);
}

export function values<T = any>(object: T): Array<T> {
    return Object.values(object);
}

export function isUpperCase(char: string | undefined | null): boolean {
    return !isNullOrUndefined(char) && char === char.toUpperCase();
}

export function isLowerCase(char: string | undefined | null): boolean {
    return !isNullOrUndefined(char) && char === char.toLowerCase();
}

export function isNumeric(value: any): value is number {
    return !isNaN(value) && isNumber(value);
}

export function isNumber(value: any): value is number {
    return toString(value) === '[object Number]';
}

export function isString(value: any): value is string {
    return toString(value) === '[object String]';
}

export function isDate(value: any): value is Date {
    return toString(value) === '[object Date]';
}

export function isArray(value: any): value is Array<any> {
    return toString(value) === '[object Array]';
}

export function isArguments(value: any): boolean {
    return toString(value) === '[object Arguments]';
}

export function isUndefined(value: any): value is undefined {
    return value === void 0;
}

export function isBoolean(value: any): value is boolean {
    return (
        value === true ||
        value === false ||
        toString(value) === '[object Boolean]'
    );
}

export function isNaN(value: any): value is typeof Number.NaN {
    return isNumber(value) && Number.isNaN(value);
}

export function isNull(value: any): value is null {
    return value === null;
}

export function toNumber(value: string, defaultn: number): number {
    const num = Number(value);
    return isNumber(num) ? num : defaultn;
}

export function isObject(value: any): value is object {
    const type = typeof value;
    return value != null && (type === 'object' || type === 'function');
}

export function isFunction(value: any): value is Function {
    if (!isObject(value)) {
        return false;
    }
    const tag = toString(value);
    return (
        tag === '[object Function]' ||
        tag === '[object GeneratorFunction]' ||
        tag === '[object Proxy]'
    );
}

export function isLength(value: any): value is number {
    return (
        typeof value === 'number' &&
        value > -1 &&
        value % 1 === 0 &&
        value <= MAX_SAFE_INTEGER
    );
}

export function isArrayLike(value: any): value is ArrayLike<any> {
    return value != null && isLength(value.length) && !isFunction(value);
}

export function isNullOrUndefined(value: any): value is null | undefined {
    return isUndefined(value) || isNull(value);
}

export function isEmpty(value: any): boolean {
    if (isNullOrUndefined(value)) {
        return true;
    }
    if (isNumeric(value)) {
        return false;
    }
    if (
        isArrayLike(value) &&
        (isArray(value) || isString(value) || isArguments(value))
    ) {
        return value.length === 0;
    }
    return keys(value).length === 0;
}

export function toPromise<T>(
    promises: Array<Promise<T>>,
    resolver: (values: Array<T>) => T
): Promise<T> {
    return new Promise((resolve, reject) => {
        Promise.all(promises).then((values: Array<T>) => {
            resolve(resolver(values));
        }, reject);
    });
}

export function conditional(condition: Function, fn: Function) {
    return function(this: any, ...args: Array<any>) {
        return condition.apply(this, args) ? fn.apply(this, args) : void 0;
    };
}

export function isNative(object: any): boolean {
    if (object instanceof Date) {
        return true;
    } else if (typeof File !== 'undefined' && object instanceof File) {
        return true;
    } else if (typeof FormData !== 'undefined' && object instanceof FormData) {
        return true;
    }
    return false;
}

export function replaceAll(
    source: string,
    search: string,
    replacement: string
): string {
    return source.split(search).join(replacement);
}
