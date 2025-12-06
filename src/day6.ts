import { readLines } from "./shared/line-reader";
import { toStringCoord } from "./shared/maze";

export const part1 = (sample: boolean): number => {
  const worksheet = getWorksheet(1, sample);

  let total = 0;
  for (let col = 0; col < worksheet.cols; col++) {
    const colOperation = worksheet.operations.get(col) || '+';
    if (colOperation == '+') {
      total += [...Array(worksheet.rows).keys()]
        .map(row => worksheet.numbers.get(toStringCoord(row, col)) || 0)
      .reduce((a, b) => a += b, 0);
    } else {
      total +=[...Array(worksheet.rows).keys()]
        .map(row => worksheet.numbers.get(toStringCoord(row, col)) || 0)
      .reduce((a, b) => a *= b, 1);
    }
  }

  return total;

}

export const part2 = (sample: boolean): number => {
  return 0;
}

const getWorksheet = (part: number, sample: boolean): Worksheet => {
  const lines = readLines(6, part, sample).filter(Boolean);

  const numbers: Map<string, number> = new Map();
  const operations: Map<number, string> = new Map();

  let cols = 0;
  for (let row = 0; row < lines.length; row++) {
    const line = lines[row];

    if (line.match(/\d/)) {
      const nums = [...line.matchAll(/\d+/g)].map(Number);
      for (let col = 0; col < nums!.length; col++) {
        numbers.set(toStringCoord(row, col), nums[col]);
      }

      cols = nums.length;
    } else {
      const oprs = [...line.matchAll(/[\+,\*]/g)];
      for (let col = 0; col < oprs.length; col++) {
        operations.set(col, oprs[col].toString());
      }
    }
  }

  return { numbers, operations, rows: lines.length - 1, cols }
}

interface Worksheet {
  numbers: Map<string, number>,
  operations: Map<number, string>
  rows: number
  cols: number
}

