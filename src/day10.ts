import { combinations } from "./shared/combinations";
import { readLines } from "./shared/line-reader";
import { equals, symmetricDiff } from "./shared/set";
import GLPK from "glpk.js"

export const part1 = (sample: boolean): number => {
  return getMachines(1, sample)
  .map(({target, buttons}) => {
    for (let count = 1; count < buttons.length + 1; count++) {
      for (let combs of combinations(buttons, count)) {
        let set = new Set<number>();
        for (let combo of combs) {
          set = symmetricDiff(set, combo);
          if (equals(set, target)) {
            return count;
          }
        } 
      }
    }

    return 0;
  }).reduce((a, b) => a += b, 0);
}

export const part2 = (sample: boolean): number => {
  return getMachines(2, sample)
    .map(({buttons, joltages}) => ({ 
      joltages, 
      buttons: buttons.map(b => toBitVector(b, joltages.length))
    }))
    .map(({buttons, joltages}) => minPresses(buttons, joltages))
    .reduce((a, b) => a += b, 0);
}

const minPresses = (buttons: number[][], target: number[]): number => {
  const glpk = GLPK();

  const lp: any = {
    name: "LightsOut",
    objective: {
      direction: glpk.GLP_MIN,
      name: "totalPresses",
      vars: []
    },
    subjectTo: [],
    generals: [] // integer variables
  };

  for (let j = 0; j < buttons.length; j++) {
    const varName = `x${j}`;
    lp.objective.vars.push({ name: varName, coef: 1 }); // minimize sum(x_j)

    // Register this button as an integer variable
    lp.generals.push(varName);
  }

  // Add a constraint for each light
  for (let i = 0; i < target.length; i++) {
    const row: any = {
      name: `light${i}`,
      vars: [],
      bnds: { type: glpk.GLP_FX, ub: target[i], lb: target[i] }
    };

    for (let j = 0; j < buttons.length; j++) {
      if (buttons[j][i] !== 0) {
        // Each light’s equation: sum(A[j][i] * x_j) == target[i]
        row.vars.push({ name: `x${j}`, coef: buttons[j][i] });
      }
    }

    lp.subjectTo.push(row);
  }

  // Solve the integer MILP
  const result = glpk.solve(lp, { msglev: glpk.GLP_MSG_OFF });

  return !result.result ? 0 : result.result.z;
}

const toBitVector = (buttons: Set<number>, count: number): number[] => {
  return Array.from(
    {length: count}, 
    (_, i) => buttons.has(i) ? 1 : 0
  );
}

const getMachines = (part: number, sample: boolean): Machine[] => {
  return readLines(10, part, sample)
    .map(line => line.trim().match(/(\[.+\]) ([\(\)\d+\, ]+) ([\{\}\d+\,]+)/))
    .filter(Boolean)
    .map(m => {
      const target = m![1].slice(1, -1).split('').reduce((a, b, i) => {
        if (b === '#') {
          a.add(i);
        }
        return a;
      }, new Set<number>());

      const buttons = m![2].trim()
        .split(' ')
        .map(button => button
             .slice(1, -1)
             .split(',')
             .map(Number)
             .reduce((a, b) => a.add(b), new Set<number>())
            );

      const joltages = m![3].slice(1, -1).split(',').map(Number);

      return {target, buttons, joltages}
    });
}


interface Machine {
  target: Set<number>,
  buttons: Set<number>[],
  joltages: number[]
}
