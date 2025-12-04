import { part1, part2 } from "@src/day4";

describe('day4', () => {
  it('part 1, sample', () => {
    expect(part1(true)).toBe(13);
  });

  it('part 1', () => {
    expect(part1(false)).toBe(1351);
  });

  it('part 2, sample', () => {
    expect(part2(true)).toBe(43);
  });

  it('part 2', () => {
    expect(part2(false)).toBe(8345);
  });
});
