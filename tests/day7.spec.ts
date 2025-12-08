import { part1, part2 } from "@src/day7";

describe('day7', () => {
  it('part 1, sample', () => {
    expect(part1(true)).toBe(21);
  });

  it('part 1', () => {
    expect(part1(false)).toBe(1642);
  });

  it('part 2, sample', () => {
    expect(part2(true)).toBe(40);
  });

  it('part 2', () => {
    expect(part2(false)).toBe(47274292756692);
  });
});
