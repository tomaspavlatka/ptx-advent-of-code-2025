import { getMaze, DIRECTIONS, moveInDirection, getSymbols } from "./shared/maze";

export const part1 = (sample: boolean): number => {
  const roles = getRoles(1, sample);

  return getRemovableRolls(getRoles(1, sample)).length;
}

const countNeighbours = (coord: string, roles: Set<string>): number => {
  return DIRECTIONS
    .map((dir) => moveInDirection(coord, dir))
    .filter(role => roles.has(role))
    .length;
}

export const part2 = (sample: boolean): number => {
  const roles = getRoles(2, sample);

  let positions = 0;
  while (true) {
    let removable = getRemovableRolls(roles);
    positions += removable.length;
    if (removable.length == 0) {
      break;
    }

    removable.forEach((role) => roles.delete(role));
  }


  return positions;
}

const getRemovableRolls = (roles: Set<string>): string[] => {
  return [...roles]
    .map((role) => ({
      role, 
      neighbors: countNeighbours(role, roles)
    }))
    .filter((role) => role.neighbors < 4)
    .map((role) => role.role);
}

const getRoles = (part: number, sample: boolean): Set<string> => {
  const maze = getMaze(4, part, sample);

  return getSymbols(maze, '@');
}

