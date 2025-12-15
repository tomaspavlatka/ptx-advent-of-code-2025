import { readLines } from "./shared/line-reader";

export const part1 = (sample: boolean): number => {
  const points = getPoints(1, sample)
    .map((point) => ({point, circuit: -1}));

  const distances: Map<number, PointInCircuit[][]> = new Map();
  
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const distance = countDistance(points[i].point, points[j].point);

      const point1 = points[i];
      const point2 = points[j];

      let current = distances.get(distance) || [];
      current.push([point1, point2]);

      distances.set(distance, current);
    }
  }

  const data = [...distances.entries()].sort((a, b) => a[0] - b[0]);


  let circuitIdx = 0;
  const cicruits: Map<number, CustomSet<PointInCircuit>> = new Map();

  const limit = sample ? 10 : 1000;
  for (let i = 0; i < limit; i++) {
    const [_, pairs] = data[i];
    for (let [point1, point2] of pairs) {
      if (point1.circuit === -1 && point2.circuit === -1) {
        point1.circuit = circuitIdx;
        point2.circuit = circuitIdx;

        const set = new CustomSet<PointInCircuit>(point => `${point.point.x}-${point.point.y}-${point.point.z}`);
        set.add(point1);
        set.add(point2);
        cicruits.set(circuitIdx, set);
        circuitIdx++;
      } else if (point1.circuit != -1 && point2.circuit === -1) {
        point2.circuit = point1.circuit;
        cicruits.get(point1.circuit!)!.add(point2);
      } else if (point2.circuit != -1 && point1.circuit === -1) {
        point1.circuit = point2.circuit;
        cicruits.get(point2.circuit!)!.add(point1);
      } else if (point1.circuit! != point2.circuit!) {
        const legacyCircuit = point2.circuit!;
        const targetCircuit = point1.circuit!;

        const toMove = cicruits.get(legacyCircuit)!;
        const target = cicruits.get(targetCircuit)!;

        toMove.values().forEach((val) => {
          val.circuit = targetCircuit;
          target.add(val);
        });

        cicruits.delete(legacyCircuit);

        if (cicruits.size === 1) {
          return point1.point.x * point2.point.x;
        }
      }
    }
  }

  return [...cicruits.values()]
    .map((value) => value.size())
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((a, b) => a *= b, 1);
}

class CustomSet<T> {
  private items: T[] = [];
  private getKey: (item: T) => string;

  constructor(getKey: (item: T) => string) {
    this.getKey = getKey;
  }

  add(item: T): void {
    const key = this.getKey(item);
    if (!this.items.some(existing => this.getKey(existing) === key)) {
      this.items.push(item);
    }
  }

  has(item: T): boolean {
    return this.items.some(existing => this.getKey(existing) === this.getKey(item)); 
  }

  values (): T[] {
    return [...this.items];
  }

  size (): number {
    return this.items.length;
  }
}

export const part2 = (sample: boolean): number => {
  const points = getPoints(2, sample)
    .map(point => ({ point, circuit: -1 }));

  const edges: { d: number; a: PointInCircuit; b: PointInCircuit }[] = [];

  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      edges.push({
        d: countDistance(points[i].point, points[j].point),
        a: points[i],
        b: points[j],
      });
    }
  }

  edges.sort((x, y) => x.d - y.d);

  let circuitIdx = 0;
  let components = points.length; 

  const circuits = new Map<number, CustomSet<PointInCircuit>>();

  for (const { a, b } of edges) {
    // Already connected → ignore
    if (a.circuit !== -1 && a.circuit === b.circuit) continue;

    if (a.circuit === -1 && b.circuit === -1) {
      const set = new CustomSet<PointInCircuit>(
        p => `${p.point.x}-${p.point.y}-${p.point.z}`
      );

      a.circuit = b.circuit = circuitIdx;
      set.add(a);
      set.add(b);
      circuits.set(circuitIdx++, set);

      components--; // merged two components

    } else if (a.circuit !== -1 && b.circuit === -1) {
      b.circuit = a.circuit;
      circuits.get(a.circuit)!.add(b);

      components--; // merged
    } else if (b.circuit !== -1 && a.circuit === -1) {
      a.circuit = b.circuit;
      circuits.get(b.circuit)!.add(a);

      components--; // merged
    } else {
      const from = b.circuit!;
      const to = a.circuit!;
      const fromSet = circuits.get(from)!;
      const toSet = circuits.get(to)!;

      fromSet.values().forEach(p => {
        p.circuit = to;
        toSet.add(p);
      });

      circuits.delete(from);
      components--; // merged two existing components
    }

    // THE ONLY CORRECT TERMINATION CHECK
    if (components === 1) {
      return a.point.x * b.point.x;
    }
  }

  throw new Error("Graph never fully connected");
};


const countDistance = (point1: Point, point2: Point): number => {
  return Math.pow(point1.x - point2.x, 2)
      + Math.pow(point1.y - point2.y, 2)
      + Math.pow(point1.z - point2.z, 2)
 ;
}

const getPoints = (part: number, sample: boolean): Point[] => {
  return readLines(8, part, sample)
    .filter(Boolean)
    .map(line => line.split(','))
    .map(numbers => ({
      x: Number(numbers[0]),
      y: Number(numbers[1]),
      z: Number(numbers[2]),
    }));
}

interface PointInCircuit {
  circuit: number, 
  point: Point
}

interface Point {
  x: number, 
  y: number, 
  z: number
}
