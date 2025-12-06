import { readLines } from "./line-reader";

export interface Maze {
  rows: number;
  cols: number;
  symbols: Map<string, Set<string>>
}

export interface Coordinates {
  row: number;
  col: number;
}

export const getSymbols = (maze: Maze, symbol: string): Set<string> => {
  return maze.symbols.get(symbol) || new Set();
}

export const getMaze = (day: number, part: number, sample: boolean): Maze => {
  const symbols: Map<string, Set<string>> = new Map();

  const lines = readLines(day, part, sample);
  for (let row = 0; row < lines.length; row++) {
    const line = lines[row];
    for (let col = 0; col < line.length; col++) {
      const symbol = line[col];

      const current = symbols.get(symbol) || new Set();
      current.add(toStringCoord(row, col));

      symbols.set(symbol, current);
    }
  }

  return {
    rows: lines.length, 
    cols: lines[0].length,
    symbols
  }
}

export const toStringCoord = (row: number, col: number): string => {
  return `r${row}-c${col}`;
}

export const DIRECTIONS = ['n' , 'ne' , 'e' , 'se' , 's' , 'sw' , 'w' , 'nw'] as const;

export type Direction = typeof DIRECTIONS[number];

export const moveInDirection = (coord: string, dir: Direction): string => {
  const coordinates = toCoordinates(coord);

  switch (dir) {
    case 'n': 
      return toStringCoord(coordinates.row - 1, coordinates.col);
    case 'ne': 
      return toStringCoord(coordinates.row - 1, coordinates.col + 1);
    case 'e': 
      return toStringCoord(coordinates.row, coordinates.col + 1);
    case 'se': 
      return toStringCoord(coordinates.row + 1, coordinates.col + 1);
    case 's': 
      return toStringCoord(coordinates.row + 1, coordinates.col);
    case 'sw': 
      return toStringCoord(coordinates.row + 1, coordinates.col - 1);
    case 'w': 
      return toStringCoord(coordinates.row, coordinates.col - 1);
    case 'nw': 
      return toStringCoord(coordinates.row - 1, coordinates.col - 1);
  }

}

const toCoordinates = (coord: string): Coordinates => {
  const [row, col] = coord.split('-');

  return {
    row: +row.slice(1),
    col: +col.slice(1),
  }
}
