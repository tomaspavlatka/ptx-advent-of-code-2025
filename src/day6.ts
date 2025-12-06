import { readLines } from "./shared/line-reader";
import { toStringCoord } from "./shared/maze";

export const part1 = (sample: boolean): number => {
  const worksheet = getWorksheet(1, sample);

  let total = 0;
  for (let col = 0; col < worksheet.indexes.length; col++) {
    const colOperation = worksheet.operations.get(col) || '+';
    if (colOperation == '+') {
      total += [...Array(worksheet.rows + 1).keys()]
        .map(row => worksheet.numbers.get(toStringCoord(row, col)) || 0)
      .reduce((a, b) => a += b, 0);
    } else {
      total += [...Array(worksheet.rows + 1).keys()]
        .map(row => worksheet.numbers.get(toStringCoord(row, col)) || 0)
      .reduce((a, b) => a *= b, 1);
    }
  }

  return total;
}

export const part2 = (sample: boolean): number => {
  const worksheet = getWorksheet(2, sample);

  let total = 0;
  for (let i = 0; i < worksheet.indexes.length; i++) {
    const start = worksheet.indexes[i];
    const end = i < worksheet.indexes.length - 1 ? worksheet.indexes[i+1] - 2 : worksheet.cols;

    const reals = [];
    for (let col = start; col <= end; col++) {
      const nums: number[] = [];
      for (let row = 0; row <= worksheet.rows; row++) {
        const val = worksheet.maze.get(toStringCoord(row, col));
        if (val != undefined && val != ' ' && val != '+' && val != '*') {
          nums.push(Number(val));
        }
      }
      reals.push(nums);
    }

    const d = reals.map(nums => Number(nums.join('')));

    const operator = worksheet.operations.get(i);
    if (operator == '+') {
      total += d.reduce((a,b) => a += b, 0);
    } else {
      total += d.reduce((a,b) => a *= b, 1);
    }
  }

  return total;
}

const getWorksheet = (part: number, sample: boolean): Worksheet => {
  const lines = readLines(6, part, sample).filter(Boolean);

  const numbers: Map<string, number> = new Map();
  const operations: Map<number, string> = new Map();
  const maze: Map<string, string> = new Map();
  const indexes = [];

  let cols = 0;
  for (let row = 0; row < lines.length; row++) {
    const line = lines[row];

    if (line.match(/\d/)) {
      const nums = [...line.matchAll(/\d+/g)].map(Number);
      for (let col = 0; col < nums!.length; col++) {
        numbers.set(toStringCoord(row, col), nums[col]);
      }

      cols = line.length - 1;
    } else {
      const oprs = line.split('');
      let oprIdx = 0;
      for (let col = 0; col < oprs.length; col++) {
        const colOpr = oprs[col];
        if (colOpr == '+' || colOpr == '*') {
          operations.set(oprIdx++, colOpr);
          indexes.push(col);
        }
      }
    }

    for (let col = 0; col < line.length; col++) {
      if (line.match(/\d+/)) {
        maze.set(toStringCoord(row, col), line[col]);
      }
    }
  }

  return { numbers, operations, indexes, rows: lines.length - 2, cols, maze }
}

interface Worksheet {
  numbers: Map<string, number>,
  maze: Map<string, string>,
  operations: Map<number, string>
  indexes: number[],
  rows: number
  cols: number
}

