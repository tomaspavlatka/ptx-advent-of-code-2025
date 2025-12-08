import { Coordinates, getMaze, getSymbols, moveInDirection, toCoordinates, toStringCoord } from "./shared/maze";
import { readLines } from "./shared/line-reader";
import { read } from "node:fs";

export const part1 = (sample: boolean): number => {
  const lines = readLines(7, 1, sample);
  const maze = getMaze(7, 1, sample);

  const start = toCoordinates([...getSymbols(maze, 'S')][0]).col;

  let splits = 0;
  let queue = new Set<number>;
  queue.add(start);
  for (let line of lines.slice(1)) {
    const next: Set<number> = new Set();

    for (let idx of queue) {
      if (line[idx] == '^') {
        next.add(idx + 1);
        next.add(idx - 1);
        splits++;
      } else {
        next.add(idx);
      }
    }

    queue = next;
  }

  return splits;
}

export const part2 = (sample: boolean): number => {
  const lines = readLines(7, 2, sample);
  const maze = getMaze(7, 2, sample);

  const start = toCoordinates([...getSymbols(maze, 'S').values()][0]);

  return solve(lines, start.row, start.col, new Map());
}

const solve = (lines: string[], row: number, col: number, cache: Map<number, number>): number => {
  const key = row * lines.length + col;
  if (cache.has(key)) {
    return cache.get(key) || 1;
  }

  if (row >= lines.length - 1) {
    cache.set(key, 1);
    return 1;
  }

  if (col < 0 || col >= lines[0].length || row < 0 && row >= lines.length) {
    return 0;
  }

  let sum: number;
  if (lines[row + 1][col] == '^') {
    sum = solve(lines, row + 1, col + 1, cache) + solve(lines, row + 1, col - 1, cache);
  } else {
    sum = solve(lines, row + 1, col, cache);
  }

  cache.set(key, sum);

  return sum;
}
