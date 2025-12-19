import { part1, part2 } from "@src/day9";

describe('day9', () => {
  it('part 1, sample', () => {
    expect(part1(true)).toBe(50);
  });

  it('part 1', () => {
    expect(part1(false)).toBe(4741451444);
  });

  it.only('part 2, sample', () => {
    expect(part2(true)).toBe(24);
  });

  it('part 2', () => {
    expect(part2(false)).toBe(5892);
  });
});
