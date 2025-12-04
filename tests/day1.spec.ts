import { part1, part2 } from "@src/day1";

describe('day 1', () => {
  it('part 1, sample', () => {
    expect(part1(true)).toBe(3);
  });

  it('part 1', () => {
    expect(part1(false)).toBe(1029);
  });

  it('part 2, sample', () => {
    expect(part2(true)).toBe(6);
  });

  it('part 2', () => {
    expect(part2(false)).toBe(5892);
  });
});
