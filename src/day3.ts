import { readLines } from "./shared/line-reader";

export const part1 = (sample: boolean): number => {
  return getBanks(1, sample)
    .map(getJoltageWith2)
    .reduce((a, b) => a + b, 0);
}

const getJoltageWith2 = (batteries: number[]): number => {
  const maxIdx = getMax(batteries.slice(0, batteries.length - 1));
  const maxIdx2 = getMax(batteries.slice(maxIdx + 1));

  const val =  (10 * batteries[maxIdx]) + batteries[maxIdx + maxIdx2 + 1];

  return val;
}

const getMax = (nums: number[]): number => {
  let max = nums[0];
  let idx = 0;

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] > max) {
      idx = i;
      max = nums[i];
    }
  }

  return idx;
}

export const part2 = (sample: boolean): number => {
  return getBanks(2, sample)
    .map(getJoltageWith12)
    .reduce((a, b) => a + b, 0);
}

const getJoltageWith12 = (batteries: number[]): number => {
  let nums = [];

  let cursor = 0;
  for (let i = 11; i >= 0; i--) {
    let maxIdx: number;
    if (i > 0) {
      maxIdx = getMax(batteries.slice(cursor, i * -1));
    } else {
      maxIdx = getMax(batteries.slice(cursor));
    }

    nums.push(batteries[maxIdx + cursor]);

    cursor += maxIdx + 1;
  }

  return +nums.join("");
}


const getBanks = (part: number, sample: boolean): number[][] => {
  return readLines(3, part, sample)
    .map((line) => line.split('').map(Number));
}
