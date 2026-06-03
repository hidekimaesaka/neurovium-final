import { getSudoku } from "sudoku-gen";

const BOARD_SIZE = 9;
const CELL_COUNT = 81;

function toCellValue(character) {
  return character === "-" ? 0 : Number(character);
}

function toGrid(value) {
  return Array.from({ length: BOARD_SIZE }, (_, rowIndex) =>
    value
      .slice(rowIndex * BOARD_SIZE, rowIndex * BOARD_SIZE + BOARD_SIZE)
      .split("")
      .map(toCellValue)
  );
}

function toFlatGrid(grid) {
  return grid.flat();
}

function isValidGroup(values) {
  const filledValues = values.filter((value) => value !== 0);
  return new Set(filledValues).size === filledValues.length;
}

function getColumn(grid, columnIndex) {
  return grid.map((row) => row[columnIndex]);
}

function getBlock(grid, blockRow, blockColumn) {
  const values = [];

  for (let row = blockRow * 3; row < blockRow * 3 + 3; row += 1) {
    for (let column = blockColumn * 3; column < blockColumn * 3 + 3; column += 1) {
      values.push(grid[row][column]);
    }
  }

  return values;
}

export function isValidSudokuGrid(grid) {
  for (let index = 0; index < BOARD_SIZE; index += 1) {
    if (!isValidGroup(grid[index]) || !isValidGroup(getColumn(grid, index))) {
      return false;
    }
  }

  for (let blockRow = 0; blockRow < 3; blockRow += 1) {
    for (let blockColumn = 0; blockColumn < 3; blockColumn += 1) {
      if (!isValidGroup(getBlock(grid, blockRow, blockColumn))) {
        return false;
      }
    }
  }

  return true;
}

function canPlace(flatGrid, cellIndex, value) {
  const row = Math.floor(cellIndex / BOARD_SIZE);
  const column = cellIndex % BOARD_SIZE;
  const blockRow = Math.floor(row / 3) * 3;
  const blockColumn = Math.floor(column / 3) * 3;

  for (let index = 0; index < BOARD_SIZE; index += 1) {
    if (flatGrid[row * BOARD_SIZE + index] === value) {
      return false;
    }

    if (flatGrid[index * BOARD_SIZE + column] === value) {
      return false;
    }
  }

  for (let currentRow = blockRow; currentRow < blockRow + 3; currentRow += 1) {
    for (
      let currentColumn = blockColumn;
      currentColumn < blockColumn + 3;
      currentColumn += 1
    ) {
      if (flatGrid[currentRow * BOARD_SIZE + currentColumn] === value) {
        return false;
      }
    }
  }

  return true;
}

function findEmptyCellWithFewestOptions(flatGrid) {
  let bestCell = -1;
  let bestOptions = null;

  for (let index = 0; index < CELL_COUNT; index += 1) {
    if (flatGrid[index] !== 0) {
      continue;
    }

    const options = [];
    for (let value = 1; value <= BOARD_SIZE; value += 1) {
      if (canPlace(flatGrid, index, value)) {
        options.push(value);
      }
    }

    if (!bestOptions || options.length < bestOptions.length) {
      bestCell = index;
      bestOptions = options;
    }

    if (options.length <= 1) {
      break;
    }
  }

  return { cellIndex: bestCell, options: bestOptions || [] };
}

export function countSudokuSolutions(grid, limit = 2) {
  const flatGrid = toFlatGrid(grid);
  let count = 0;

  function solve() {
    if (count >= limit) {
      return;
    }

    const { cellIndex, options } = findEmptyCellWithFewestOptions(flatGrid);

    if (cellIndex === -1) {
      count += 1;
      return;
    }

    for (const value of options) {
      flatGrid[cellIndex] = value;
      solve();
      flatGrid[cellIndex] = 0;

      if (count >= limit) {
        return;
      }
    }
  }

  solve();
  return count;
}

function buildFixedCells(puzzle) {
  return puzzle.split("").map((character) => character !== "-");
}

function validateGeneratedSudoku(generated) {
  if (
    generated.puzzle.length !== CELL_COUNT ||
    generated.solution.length !== CELL_COUNT
  ) {
    return null;
  }

  const puzzleGrid = toGrid(generated.puzzle);
  const solutionGrid = toGrid(generated.solution);
  const emptyCells = generated.puzzle.split("").filter((cell) => cell === "-").length;

  if (!isValidSudokuGrid(puzzleGrid) || !isValidSudokuGrid(solutionGrid)) {
    return null;
  }

  if (countSudokuSolutions(puzzleGrid) !== 1) {
    return null;
  }

  return {
    puzzle: puzzleGrid,
    solution: solutionGrid,
    fixedCells: buildFixedCells(generated.puzzle),
    emptyCells,
    generatorDifficulty: generated.difficulty
  };
}

function buildDevSudoku() {
  const generated = getSudoku("easy");
  const solution = generated.solution;
  const missingIndex = 80;
  const puzzle =
    solution.slice(0, missingIndex) + "-" + solution.slice(missingIndex + 1);

  return validateGeneratedSudoku({
    difficulty: "dev-one-missing",
    puzzle,
    solution
  });
}

export function generateSudokuPuzzle(difficultyId) {
  if (difficultyId === "dev-one-missing") {
    const sudoku = buildDevSudoku();

    if (!sudoku) {
      throw new Error("Não foi possível gerar o Sudoku de desenvolvimento.");
    }

    return sudoku;
  }

  const maxAttempts = 10;

  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    const generated = getSudoku(difficultyId);
    const sudoku = validateGeneratedSudoku(generated);

    if (sudoku) {
      return sudoku;
    }
  }

  throw new Error("Não foi possível gerar um Sudoku válido com solução única.");
}
