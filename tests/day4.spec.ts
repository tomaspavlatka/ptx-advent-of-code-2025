import { part1, part2 } from "@src/day4";

describe('day4', () => {
  it.only('part 1, sample', () => {
    expect(part1(true)).toBe(13);
  });

  it.only('part 1', () => {
    expect(part1(false)).toBe(17034);
  });

  it('part 2, sample', () => {
    expect(part2(true)).toBe(3121910778619);
  });

  it('part 2', () => {
    expect(part2(false)).toBe(168798209663590);
  });
});
