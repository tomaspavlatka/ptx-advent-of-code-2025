import { readLines } from "./shared/line-reader";

export const part1 = (sample: boolean): number => {
  return getBanks(1, sample)
    .map((batteries) => getJoltage(batteries, 2))
    .reduce((a, b) => a + b, 0);
}

const getMaxIdx = (nums: number[]): number => {
  return nums
    .reduce((best, val, i) => (val > nums[best]) ? i : best , 0);
}

export const part2 = (sample: boolean): number => {
  return getBanks(2, sample)
    .map((batteries) => getJoltage(batteries, 12))
    .reduce((a, b) => a + b, 0);
}

const getJoltage = (batteries: number[], limit: number): number => {
  let joltages = [];

  let cursor = 0;
  for (let i = limit; i > 0; i--) {
    const end = batteries.length - i + 1;
    const slice = batteries.slice(cursor, end);

    const maxIdx = getMaxIdx(slice);

    joltages.push(slice[maxIdx]);
    cursor += maxIdx + 1;
  }

  return Number(joltages.join(""));
}


const getBanks = (part: number, sample: boolean): number[][] => {
  return readLines(3, part, sample)
    .map((line) => line.split('').map(Number));
}
