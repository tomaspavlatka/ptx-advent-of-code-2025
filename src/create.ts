import * as fs from "fs";
import * as path from "path";

const createTest = (day: number) => {
  const templatePath = path.join(__dirname, './templates/day.spec.ts.tpl');
  const tpl = fs.readFileSync(templatePath, 'utf-8')
    .replace(/{number}/g, day.toString());

  const destination = path.join(__dirname, `../tests/day${day}.spec.ts`);
  createFile(destination, tpl);
}

const createCode = (day: number) => {
  const templatePath = path.join(__dirname, './templates/day.ts.tpl');
  const tpl = fs.readFileSync(templatePath, 'utf-8')
    .replace(/{number}/g, day.toString());

  const destination = path.join(__dirname, `../src/day${day}.ts`);
  createFile(destination, tpl);
}

const createResources = (day: number) => {
  const puzzle = path.join(__dirname, `../resources/day${day}`);
  createFile(puzzle, '');

  const sample1 = path.join(__dirname, `../resources/day${day}.sample1`);
  createFile(sample1, '');

  const sample2 = path.join(__dirname, `../resources/day${day}.sample2`);
  createFile(sample2, '');
}

const createFile = (destination: string, content: string) => {
  if (fs.existsSync(destination)) {
    throw new Error(`File already exists in the destination ${destination}`);
  }

  fs.writeFileSync(destination, content);
}

const main = () => {
  const arg = process.argv.find(a => a.startsWith('--day='));
  if (arg === undefined) {
    console.error('You must provide `--date=` attribute');
    return;
  }

  const day = Number(arg.split('--day=')[1]);
  createResources(day)
  createTest(day)
  createCode(day)
};

main();

