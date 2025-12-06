import { readLines } from "./shared/line-reader";
import { toStringCoord } from "./shared/maze";

export const part1 = (sample: boolean): number => {
  const {indexes, rows, numbers, operations } = getWorksheet(1, sample);

  let total = 0;
  for (let col = 0; col < indexes.length; col++) {
    const colOperation = operations.get(col) || '+';
    if (colOperation == '+') {
      total += [...Array(rows + 1).keys()]
        .map(row => numbers.get(toStringCoord(row, col)) || 0)
      .reduce((a, b) => a += b, 0);
    } else {
      total += [...Array(rows + 1).keys()]
        .map(row => numbers.get(toStringCoord(row, col)) || 0)
      .reduce((a, b) => a *= b, 1);
    }
  }

  return total;
}

export const part2 = (sample: boolean): number => {
  const { indexes, rows, maze, operations, cols } = getWorksheet(2, sample);

  return [...Array(indexes.length).keys()]
    .map(idx => ({
      operation: operations.get(idx) || '+',
      start: indexes[idx],
      end: idx < indexes.length - 1 ? indexes[idx + 1] - 2 : cols
    }))
  .map(({ start, end, operation }) => {
    const groups = [...Array(end - start + 1).keys()]
      .map(col => [...Array(rows + 1).keys()]
        .map(row => maze.get(toStringCoord(row, start + col)))
        .filter(symbol => symbol && symbol != ' ' && symbol != '+' && symbol != '+')
      );

    return {groups, operation};
  })
  .map(({ groups, operation }) => ({
    operation, 
    numbers: groups.map(nums => Number(nums.join('')))
  }))
  .map(({operation, numbers}) => operation == '+' 
    ? numbers.reduce((a,b) => a += b, 0)
    : numbers.reduce((a,b) => a *= b, 1)
  )
  .reduce((a,b) => a += b, 0);
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

