import { part1, part2 } from "@src/day6";

describe('day6', () => {
  it('part 1, sample', () => {
    expect(part1(true)).toBe(4277556);
  });

  it('part 1', () => {
    expect(part1(false)).toBe(4693419406682);
  });

  it('part 2, sample', () => {
    expect(part2(true)).toBe(3263827);
  });

  it('part 2', () => {
    expect(part2(false)).toBe(9029931401920);
  });
});
