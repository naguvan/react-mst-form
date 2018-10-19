export function assign<T, U>(target: T, source: U): T & U;
export function assign<T, U, V>(target: T, source1: U, source2: V): T & U & V;
export function assign<T, U, V, W>(
  target: T,
  source1: U,
  source2: V,
  source3: W
): T & U & V & W;
export function assign<T, U, V, W, Z>(
  target: T,
  source1: U,
  source2: V,
  source3: W,
  source4: Z
): T & U & V & W & Z;
export function assign(target: object, ...sources: any[]): any {
  return Object.assign(target, ...sources);
}
