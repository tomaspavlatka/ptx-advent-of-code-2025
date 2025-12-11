import { part1, part2 } from "@src/day8";

describe('day8', () => {
  it.only('part 1, sample', () => {
    expect(part1(true)).toBe(40);
  });

  it('part 1', () => {
    expect(part1(false)).toBe(67488);
  });

  it('part 2, sample', () => {
    expect(part2(true)).toBe(25787);
  });

  it('part 2', () => {
    expect(part2(false)).toBe(5892);
  });
});
