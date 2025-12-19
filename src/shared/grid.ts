export const printGrid = (grid: number[][]): void => {
  console.log(
    grid.reduce((a, b) => a = a + b.join(' ') + '\n', '')
  );
};
