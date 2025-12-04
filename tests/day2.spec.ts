import { part1, part2 } from "@src/day2";

describe('day2', () => {
  it('part 1, sample', () => {
    expect(part1(true)).toBe(1227775554);
  });

  it('part 1', () => {
    expect(part1(false)).toBe(18700015741);
  });

  it('part 2, sample', () => {
    expect(part2(true)).toBe(4174379265);
  });

  it('part 2', () => {
    expect(part2(false)).toBe(20077272987);
  });
});
