import { part1, part2 } from "@src/day10";

describe('day10', () => {
  it('part 1, sample', () => {
    expect(part1(true)).toBe(7);
  });

  it('part 1', () => {
    expect(part1(false)).toBe(419);
  });

  it('part 2, sample', () => {
    expect(part2(true)).toBe(33);
  });

  it('part 2', () => {
    expect(part2(false)).toBe(18369);
  });
});
