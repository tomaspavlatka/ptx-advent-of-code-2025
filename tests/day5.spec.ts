import { part1, part2 } from "@src/day5";

describe('day5', () => {
  it('part 1, sample', () => {
    expect(part1(true)).toBe(3);
  });

  it('part 1', () => {
    expect(part1(false)).toBe(643);
  });

  it('part 2, sample', () => {
    expect(part2(true)).toBe(14);
  });

  it('part 2', () => {
    expect(part2(false)).toBe(342018167474526);
  });
});
