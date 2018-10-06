import { isArray } from "./common";

export function flatArray<T extends string | object | T[]>(array: T[]): T[] {
  return array.reduce(
    (values: T[], vs: T) => [
      ...values,
      ...(isArray(vs) ? flatArray<T>(vs) : [vs])
    ],
    [] as T[]
  );
}
