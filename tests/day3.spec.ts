import { part1, part2 } from "@src/day3";

describe('day3', () => {
  it('part 1, sample', () => {
    expect(part1(true)).toBe(357);
  });

  it('part 1', () => {
    expect(part1(false)).toBe(17034);
  });

  it('part 2, sample', () => {
    expect(part2(true)).toBe(3121910778619);
  });

  it('part 2', () => {
    expect(part2(false)).toBe(168798209663590);
  });
});
