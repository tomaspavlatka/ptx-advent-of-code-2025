import { getMaze, DIRECTIONS, moveInDirection, getSymbols } from "./shared/maze";

export const part1 = (sample: boolean): number => {
  const maze = getMaze(4, 1, sample);
  const roles = getSymbols(maze, '@');

  return [...roles]
    .map((role) => countNeighbours(role, roles))
    .filter(count => count < 4)
    .length;
}

const countNeighbours = (coord: string, roles: Set<string>): number => {
  return DIRECTIONS
    .map((dir) => moveInDirection(coord, dir))
    .filter(role => roles.has(role))
    .length;
}

export const part2 = (sample: boolean): number => {
  return 0;
}

