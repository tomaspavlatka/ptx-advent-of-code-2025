import * as fs from 'fs';
import * as path from 'path';

export const readLines = (day: number, part: number, sample: boolean): string[] => {
  let filePath = `../../resources/day${day}`;
  if (sample) {
    filePath += `.sample${part}`;
  }

  return fs.readFileSync(path.join(__dirname, filePath), 'utf-8')
    .split(/\r?\n/)
    .filter(Boolean);
}
