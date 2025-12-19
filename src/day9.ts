import { readLines } from "./shared/line-reader";
import { Coordinates } from "./shared/maze";
import { CustomSet } from "./shared/set";
import { Queue } from "./shared/queue";

export const part1 = (sample: boolean): number => {
  const reds = getReds(1, sample);

  let max = 0;
  for (let i = 0; i < reds.length; i++) {
    for (let j = i + 1; j < reds.length; j++) {
      max = Math.max(max, countSquare(reds[i], reds[j]));
    }
  }
  
  return max;
}

export const part2 = (sample: boolean): number => {
  const reds = getReds(2, sample);

  // 1 - Collect all rows and cols and sort them
  const rows = [
    ...reds.reduce((a, b) => a.add(b.row), new Set() as Set<number>).values()
  ].sort((a, b) => a - b);

  const cols = [
    ...reds.reduce((a, b) => a.add(b.col), new Set() as Set<number>).values()
  ].sort((a, b) => a - b);

  const rowIndex: Map<number, number> = new Map();
  rows.forEach((r, i) => rowIndex.set(r, i * 2));

  const colIndex: Map<number, number> = new Map();
  cols.forEach((r, i) => colIndex.set(r, i * 2));

  // 2 - Calculate spaces between each row and cols
  const rowSizes: Map<number, number> = new Map();
  for (let i = 0; i < rows.length - 1; i++) {
    rowSizes.set(i * 2 + 1, rows[i+1] - rows[i] -1)
  }

  const colSizes: Map<number, number> = new Map();
  for (let i = 0; i < cols.length - 1; i++) {
    colSizes.set(i * 2 + 1, cols[i + 1] - cols[i] - 1);
  }

  // 3 - Calculate all the pairs of the points incl. the closing one
  const pairs: Coordinates[][] = [];
  for (let i = 0; i < reds.length - 1; i++) {
    pairs.push([reds[i], reds[i+1]]);
  }
  pairs.push([reds[reds.length - 1], reds[0]]);


  // 4 - Prepare the compressed grid
  const grid: number[][] = [];
  for (let row = 0; row < rows.length * 2 - 1; row++) {
    grid[row] = new Array<number>(cols.length * 2 - 1).fill(0);
  }

  // 5 - Fill the compressed grid with 1, the red position
  pairs.forEach(([point1, point2]) => {
    const [row1, row2] = [rowIndex.get(point1.row)!, rowIndex.get(point2.row)!].sort((a, b) => a - b);
    const [col1, col2] = [colIndex.get(point1.col)!, colIndex.get(point2.col)!].sort((a, b) => a - b);

    for (let col = col1; col <= col2; col++) {
      for (let row = row1; row <= row2; row++) {
        grid[row][col] = 1;
      }
    }
  });

  // 6 - Figure out all the points, which are outside the red boxes
  const outside: CustomSet<Coordinates> = new CustomSet(coord => `${coord.row}-${coord.col}`);
  outside.add({row: -1, col: -1});

  const queue = new Queue<Coordinates>();
  queue.enqueue({row: -1, col: -1})

  while (!queue.isEmpty()) {
    const coord = queue.dequeue();
    [
      {row: coord!.row - 1, col: coord!.col},
      {row: coord!.row + 1, col: coord!.col},
      {row: coord!.row, col: coord!.col + 1},
      {row: coord!.row, col: coord!.col - 1},
    ].forEach((point) => {
        if (outside.has(point)) {  // It's already marked as outside
          return;
        }

        // We are outside of what we are checking
        if (point.col < -1 || point.row < -1 || point.row > grid.length || point.col > grid[0].length) {
          return;
        }

        // We have already set this as 1
        if (
          point.row >= 0 && point.row < grid.length 
          && point.col >= 0 && point.col < grid[0].length 
          && grid[point.row][point.col] == 1
        ) {
          return;
        }


        outside.add(point);
        queue.enqueue(point);
    });
  }

  // 7 - Fill all the points, which are not outside with 1 -> all the green tiles
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      if (!outside.has({row, col})) {
        grid[row][col] = 1;
      }
    }
  }

  // 8 - Construct prefix sum array (psa), and populate
  const psa = grid.map(row => [...row]);
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      psa[row][col] = countPsa(row, col, psa);
    }
  }

  // 9 - Find all the combinations
  const squares: Coordinates[][] = [];
  let max = 0;
  for (let i = 0; i < reds.length; i++) {
    for (let j = i + 1; j < reds.length; j++) {

      const area = countSquare(reds[i], reds[j]);
      if (max > area) {
        continue;
      }



      squares.push([reds[i], reds[j]]);
    }
  }

  return Math.max(
    ...squares
      .filter(s => valid(psa, s[0], s[1], rowIndex, colIndex))
      .map(s => countSquare(s[0], s[1]))
  );

}

const valid = (
  psa: number[][], point1: Coordinates, point2: Coordinates, 
  rowIndex: Map<number, number>, colIndex: Map<number, number>
): boolean => {
  const [row1, row2] = [rowIndex.get(point1.row)!, rowIndex.get(point2.row)!].sort((a, b) => a - b);
  const [col1, col2] = [colIndex.get(point1.col)!, colIndex.get(point2.col)!].sort((a, b) => a - b);

  const left = col1 > 0 ? psa[row2][col1 - 1] : 0;
  const top = row1 > 0 ? psa[row1 - 1][col2] : 0;
  const topleft = col1 > 0 && row1 > 0 ? psa[row1 - 1][col1 - 1] : 0;

  const count = psa[row2][col2] - left - top + topleft;
  const hash = (row2 - row1 + 1) * (col2 - col1 + 1);

  return count === hash;
}

const countPsa = (row: number, col: number, psa: number[][]): number => {
  const left = col > 0 ? psa[row][col - 1] : 0;
  const top = row > 0 ? psa[row - 1][col] : 0;
  const topleft = col > 0 && row > 0 ? psa[row - 1][col - 1] : 0;

  return psa[row][col] + left + top - topleft;
}

const countSquare = (coord: Coordinates, coord1: Coordinates): number => {
  return (Math.abs(coord.row - coord1.row) + 1 ) * (Math.abs(coord.col - coord1.col) + 1);
}

const getReds = (part: number, sample: boolean): Coordinates[] => {
  return readLines(9, part, sample)
    .filter(Boolean)
    .map((line) => {
      const [col, row] = line.split(',')
      .map(line => line.trim())
      .map(Number);

      return {row, col};
    });
}
 
