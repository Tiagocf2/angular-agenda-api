export function removeDuplicatesFromArray<T = any>(array: T[]): T[] {
  return [...new Set([...array])] as T[];
}
