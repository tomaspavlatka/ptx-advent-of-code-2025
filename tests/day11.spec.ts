import { part1, part2 } from "@src/day11";

describe('day11', () => {
  it('part 1, sample', () => {
    expect(part1(true)).toBe(5);
  });

  it('part 1', () => {
    expect(part1(false)).toBe(428);
  });

  it('part 2, sample', () => {
    expect(part2(true)).toBe(2);
  });

  it('part 2', () => {
    expect(part2(false)).toBe(331468292364745);
  });
});
