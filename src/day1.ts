import { cursorTo } from "readline";
import { readLines } from "./shared/line-reader"

export const part1 = (sample: boolean): number => {
  let cursor = 50;
  let zeroHit = 0;

  const moves = getMoves(1, sample);
  for (const move of moves) {
    let realMove = move.number % 100;
    if (move.dir == 'L') {
      cursor -= realMove
    } else {
      cursor += realMove
    }

    cursor %= 100;

    if (cursor == 0) {
      zeroHit++;
    }
  }

  return zeroHit;
}

export const part2 = (sample: boolean): number => {
  let cursor = 50;
  let zeroHits = 0;

  const moves = getMoves(2, sample);
  for (const move of moves) {
    const steps = move.number;

    zeroHits += Math.floor(move.number / 100);

    const leftover = steps % 100;

    if (cursor !== 0) {
      let crosses = false;
      if (move.dir == 'L') {
          crosses = leftover > cursor;
      } else {
          crosses = leftover > (100 - cursor);
      }

      if (crosses) {
        zeroHits++;
      }
    }

    let end: number;
    if (move.dir == 'L') {
      end = wrap(cursor - steps);
    } else {
      end = wrap(cursor + steps);
    }

    if (end === 0) {
      zeroHits++;
    }

    cursor = end;
  }

  return zeroHits;
}

const wrap = (x: number) => (x % 100 + 100) % 100;

const getMoves = (part: number, sample: boolean): Move[] => {
  return  readLines(1, part, sample).map((line) => {
    const dir = line.slice(0, 1);
    const number = Number.parseInt(line.slice(1));

    return {dir, number}
  });

}

interface Move {
  dir: string
  number: number
}

