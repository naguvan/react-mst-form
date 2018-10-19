import { assign } from "./assign";

function isMergeableObject<T>(value: T): boolean {
  const nonNullObject = value && typeof value === "object";
  return (
    nonNullObject &&
    Object.prototype.toString.call(value) !== "[object RegExp]" &&
    Object.prototype.toString.call(value) !== "[object Date]"
  );
}

function emptyTarget<T>(val: T): T {
  return Array.isArray(val) ? [] : ({} as any);
}

function cloneIfNecessary<T>(value: T, options: Partial<IMergeOptions>): T {
  return options.clone === true && isMergeableObject(value)
    ? deepmerge(emptyTarget(value), value, options)
    : value;
}

function defaultArrayMerge(
  target: any[],
  source: any[],
  options: Partial<IMergeOptions>
) {
  const destination = target.slice();
  source.forEach((e: any, i: number) => {
    if (destination[i] === void 0) {
      destination[i] = cloneIfNecessary(e, options);
    } else if (isMergeableObject(e)) {
      destination[i] = deepmerge(target[i], e, options);
    } else if (target.indexOf(e) === -1) {
      destination.push(cloneIfNecessary(e, options));
    }
  });
  return destination;
}

function mergeObject<T, U>(
  target: T,
  source: U,
  options: Partial<IMergeOptions>
): T & U {
  const destination: { [key: string]: any } = {};
  if (isMergeableObject(target)) {
    Object.keys(target).forEach(key => {
      destination[key] = cloneIfNecessary((target as any)[key], options);
    });
  }
  Object.keys(source).forEach(key => {
    const value = (source as any)[key];
    if (options.skipUndefined && value === void 0) {
      return;
    }
    if (!isMergeableObject(value) || !(target as any)[key]) {
      destination[key] = cloneIfNecessary(value, options);
    } else {
      destination[key] = deepmerge((target as any)[key], value, options);
    }
  });
  return destination as T & U;
}

type IArrayMerge = (
  source: any[],
  target: any[],
  options: Partial<IMergeOptions>
) => any[];

interface IMergeOptions {
  clone: boolean;
  skipUndefined: boolean;
  arrayMerge: IArrayMerge;
}

const defaults: IMergeOptions = {
  arrayMerge: defaultArrayMerge,
  clone: false,
  skipUndefined: false
};

export function deepmerge<T, U>(
  target: T,
  source: U = {} as any,
  options: Partial<IMergeOptions> = {}
): T & U {
  const array = Array.isArray(source);
  const optionsx = assign({}, defaults, options) as Partial<IMergeOptions>;
  const arrayMerge = options.arrayMerge!;

  if (array) {
    return Array.isArray(target)
      ? (arrayMerge(target, source as any, optionsx) as any)
      : cloneIfNecessary(source, optionsx);
  } else {
    return mergeObject(target, source, optionsx);
  }
}
