export const printGrid = (grid: number[][]): void => {
  const width = Math.max(
    ...grid.flat().map(n => n.toString().length)
  );

  console.log(
    grid.reduce(
      (a, b) => a + b.map(n => n.toString().padStart(width, ' ')).join(' ') + '\n', 
      ''
    )
  );
};
