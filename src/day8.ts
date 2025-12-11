import { readLines } from "./shared/line-reader";

class DSU {
  parent = new Map<string, string>();
  size   = new Map<string, number>();

  ensure(x: string) {
    if (!this.parent.has(x)) {
      this.parent.set(x, x);
      this.size.set(x, 1);
    }
  }

  find(x: string): string {
    if (this.parent.get(x) !== x) {
      this.parent.set(x, this.find(this.parent.get(x)!));
    }

    return this.parent.get(x)!;
  }

  union(a: string, b: string) {
    let pa = this.find(a);
    let pb = this.find(b);
    if (pa === pb) return;

    // union by size: attach smaller under larger
    if (this.size.get(pa)! < this.size.get(pb)!) {
      [pa, pb] = [pb, pa];
    }

    this.parent.set(pb, pa);
    this.size.set(pa, this.size.get(pa)! + this.size.get(pb)!);
  }
}

export const part1 = (sample: boolean): number => {
  const numbers = getNumbers(1, sample);

  const diffs = [...Array(numbers.length).keys()].map(i => {
    return [...Array(numbers.length).keys()].map(j => {
      return i <= j ? undefined : {
        distance: countDistance(numbers[i], numbers[j]),
        point1: toPointString(numbers[i]),
        point2: toPointString(numbers[j])
      }
    }).filter(val => val != undefined);
  })
  .reduce((a, b) => [...a, ...b], [])
  .sort((a, b) => a.distance - b.distance)
  .slice(0, sample ? 10 : 1000);;

  const dsu = new DSU();

  for (let diff of diffs) {
    dsu.ensure(diff.point1);
    dsu.ensure(diff.point2);
    dsu.union(diff.point1, diff.point1);
  }

  const groups = new Map<string, number>();

  for (let p of numbers.map(toPointString)) {
    dsu.ensure(p);
  }

  for (let p of numbers.map(toPointString)) {
    const root = dsu.find(p);
    groups.set(root, (groups.get(root) ?? 0) + 1);
  }

  console.log(groups);


  return [...groups.values()]
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((a, b) => a *= b, 1);
}

export const part2 = (sample: boolean): number => {
  return 0;
}

const toPointString = (point: Point): string => {
  return `${point.x}-${point.y}-${point.z}`;
}

const countDistance = (point1: Point, point2: Point): number => {
  return Math.pow(point1.x - point2.x, 2)
      + Math.pow(point1.y - point2.y, 2)
      + Math.pow(point1.z - point2.z, 2)
 ;
}

const getNumbers = (part: number, sample: boolean): Point[] => {
  return readLines(8, part, sample)
    .filter(Boolean)
    .map(line => line.split(','))
    .map(numbers => ({
      x: Number(numbers[0]),
      y: Number(numbers[1]),
      z: Number(numbers[2]),
    }));
}

interface Point {
  x: number, 
  y: number, 
  z: number
}
