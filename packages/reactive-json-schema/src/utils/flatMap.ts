export function flatMap<T, U>(
  array: T[],
  mapper: (value: T, index: number, array: T[]) => U[]
): U[] {
  return ([] as U[]).concat(...array.map(mapper));
}
