import { readLines } from "./shared/line-reader";

type Plan = Map<string, string[]>;

export const part1 = (sample: boolean): number => {
  return dfs(getPlan(1, sample), 'you');
}

const dfsImpr = (
  plan: Plan, node: string, 
  dac: boolean, fft: boolean, 
  cache: Map<string, number>
): number => {
  if (node === 'out') {
    return (dac && fft) ? 1 : 0;
  } 

  const cacheKey = `${node}-${dac}-${fft}`;
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey) || 0;
  }

  const dacN = node == 'dac' ? true : dac;
  const fftN = node == 'fft' ? true : fft;

  let total = 0;
  for (const nb of plan.get(node) || []) {
    total += dfsImpr(plan, nb, dacN, fftN, cache);
  }

  cache.set(cacheKey, total);

  return total;
}

const dfs = (plan: Plan, node: string): number => {
  if (node === 'out') {
    return 1;
  } 

  return [...plan.get(node) || []]
    .map(node => dfs(plan, node))
    .reduce((a, b) => a += b, 0);
}

export const part2 = (sample: boolean): number => {
  return dfsImpr(
    getPlan(2, sample), 'svr', false, false, new Map<string, number>()
  );
}

const getPlan = (part: number, sample: boolean): Plan => {
  return readLines(11, part, sample)
    .filter(Boolean)
    .map(line => line.split(':').map(p => p.trim()))
    .map(([key, path]) => ({key, paths: path.split(' ')}))
    .reduce((a, b) => a.set(b.key, b.paths), new Map<string, string[]>());
}
