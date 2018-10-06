export function flatMap<T, U>(
  array: T[],
  mapper: (value: T, index: number, array: T[]) => U[]
): U[] {
  return [].concat(...(array.map(mapper) as any));
}
