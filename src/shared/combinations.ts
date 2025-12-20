export const combinations = function* <T>(arr: T[], k: number, start = 0, combo: T[] = []): Generator<T[]> {
  if (combo.length === k) {
    yield [...combo];
    return;
  }

  for (let i = start; i < arr.length; i++) {
    combo.push(arr[i]);
    yield* combinations(arr, k, i + 1, combo);
    combo.pop();
  }
}
