import { readLines } from "./shared/line-reader";

export const part1 = (sample: boolean): number => {
  const plan = getPlan(1, sample);

  return plan.ingredients
    .filter((ingr) => plan.ranges.some((range) => range.min <= ingr && range.max >= ingr))
    .length;
}

export const part2 = (sample: boolean): number => {
  return getPlan(2, sample).ranges
    .sort((a, b) => a.min - b.min)
    .reduce((merged, range) => {
      if (merged.length == 0 || merged[merged.length - 1].max < range.min) {
        merged.push(range);
      } else {
        merged[merged.length - 1].max = Math.max(merged[merged.length - 1].max, range.max);
      }

      return merged;
    }, [] as Range[])
    .reduce((a, b) => a += b.max - b.min + 1, 0);
}

const getPlan = (part: number, sample: boolean): Plan => {
  const lines = readLines(5, part, sample);
  const idx = lines.indexOf("");

  const ranges = lines.slice(0, idx).map(line => {
    const [min, max] = line.split("-").map(Number);
    return { min, max };
  });

  const ingredients = lines.slice(idx + 1).map(Number);

  return { ranges, ingredients };
}

interface Range {
  min: number;
  max: number;
}

interface Plan {
  ranges: Range[];
  ingredients: number[]
}

