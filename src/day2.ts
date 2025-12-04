import { readLines } from "./shared/line-reader";

export const part1 = (sample: boolean): number => {
  return getRanges(1, sample)
    .map((range) => getWithRepeatedBlocks(range))
    .map((invalid) => invalid.reduce((a, b) => a + b, 0))
    .reduce((a,b) => a + b, 0);
}

const getWithRepeatedBlocks = (range: Range): number[] => {
  return Array.from(
    {length: range.end - range.start + 1},
    (_, i) => range.start + i,
  ).filter(hasRepeatedBlocks);
}

const hasRepeatedBlocks = (num: number): boolean => {
  const s = num.toString();
  if (s.length < 2) {
    return false;
  }

  const half = s.length / 2;
  const left = s.slice(0, half);
  const right = s.slice(half);

  if (left.startsWith('0')) {
    return false;
  }

  return left == right;
}

export const part2 = (sample: boolean): number => {
  return getRanges(1, sample)
    .map((range) => getInvalidIds(range))
    .map((invalid) => invalid.reduce((a, b) => a + b, 0))
    .reduce((a,b) => a + b, 0);
}

const getInvalidIds = (range: Range): number[] => {
  return  Array.from(
    {length: range.end - range.start + 1},
    (_, i) => range.start + i,
  ).filter(isInvalidId);
}

const isInvalidId = (num: number): boolean => {
  const s = num.toString();
  const len = s.length;
  if (len < 2) {
    return false;
  }

  for (let blockSize = 1; blockSize <= Math.floor(len / 2); blockSize++) {
    if (len % blockSize !== 0) {
      continue;
    }

    const block = s.slice(0, blockSize);
    if (block.startsWith('0')) {
      continue;
    }

    const repeats = len / blockSize;
    if (repeats >= 2) {
      const build = block.repeat(repeats);
      if (build === s) {
        return true;
      }
    }

  }

  return false;
}

const getRanges = (part: number, sample: boolean): Range[] => {
  return readLines(2, part, sample)[0]
    .split(',')
    .map((line) => line.split('-').map(Number))
    .map((range) => ({
      start: range[0],
      end: range[1]
    }));
}

interface Range {
  start: number;
  end: number;
}
