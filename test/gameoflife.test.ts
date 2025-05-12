class Universe {
  private population: Cell[][];

  constructor(populationSeed: Cell[][]) {
    this.population = populationSeed;
  }

  currentPopulation() {
    return this.population;
  }

  countLiveNeighborsOf(resident: Cell) {
    const neighborsPositions = resident.getNeighborsPositions();
    let liveNeighborsCount = 0;
    for (
      let neighborsPositionIndex = 0;
      neighborsPositionIndex < neighborsPositions.length;
      neighborsPositionIndex++
    ) {
      let x = neighborsPositions[neighborsPositionIndex][0];
      let y = neighborsPositions[neighborsPositionIndex][1];
      if (this.areNeighborsInUniverse(resident, x, y)) {
        liveNeighborsCount++;
      }
    }
    return liveNeighborsCount;
  }

  nextPopulation(resident: Cell) {
    const liveNeighborsCount = this.countLiveNeighborsOf(resident);
    if (liveNeighborsCount < 2) {
      for (let rowIndex = 0; rowIndex < this.population.length; rowIndex++) {
        for (let columnIndex = 0; columnIndex < this.population[rowIndex].length; columnIndex++) {
            this.population[rowIndex].splice(columnIndex);
        }
      }
      new Universe(this.population);
    }
    if (liveNeighborsCount > 3) {
      for (let rowIndex = 0; rowIndex < this.population.length; rowIndex++) {
        for (let columnIndex = 0; columnIndex < this.population[rowIndex].length; columnIndex++) {
          this.population[rowIndex].splice(columnIndex);
        }
      }
      this.population.pop();
      new Universe(this.population);
    }
    if (this.isLiveCellWithTwoOrThreeLiveNeighbors(liveNeighborsCount)) {
      for (let rowIndex = 0; rowIndex < this.population.length; rowIndex++) {
        for (let columnIndex = 0; columnIndex < this.population[rowIndex].length; columnIndex++) {
          if (!resident.equals(this.population[rowIndex][columnIndex])) {
            this.population[rowIndex].splice(columnIndex, 1);
          }
        }
      }

      // there's a better way I'm sure
      if (this.population.length > 1) {
        this.population.pop();
      }
      new Universe(this.population);
    }
  }

  private isLiveCellWithTwoOrThreeLiveNeighbors(liveNeighborsCount: number) {
    return liveNeighborsCount === 2 || liveNeighborsCount === 3;
  }

  private areNeighborsInUniverse(resident: Cell, x: number, y: number) {
    return (
      this.population[resident.x + x] !== undefined &&
      this.population[resident.x + x][resident.y + y] !== undefined
    );
  }
}

class Cell {
  public x: number;
  public y: number;
  private neighborsPositions = [
    [-1, -1],
    [0, -1],
    [1, -1],
    [-1, 0],
    [1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
  ];

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  equals(cell: Cell) {
    return cell.x === this.x && cell.y === this.y;
  }

  getNeighborsPositions() {
    return this.neighborsPositions;
  }
}

describe("Game Of Life Should", () => {
  test("take population seed of size 3", () => {
    const expectedPopulation = [
      [new Cell(0, 0), new Cell(0, 1), new Cell(0, 2)],
    ];

    const populationSeed = [[new Cell(0, 0), new Cell(0, 1), new Cell(0, 2)]];

    const universe = new Universe(populationSeed);

    expect(universe.currentPopulation()).toEqual(expectedPopulation);
  });

  test("take population seed of size 6", () => {
    const expectedPopulation = [
      [new Cell(0, 0), new Cell(0, 1), new Cell(0, 2)],
      [new Cell(1, 0), new Cell(1, 1), new Cell(1, 2)],
    ];

    const populationSeed = [
      [new Cell(0, 0), new Cell(0, 1), new Cell(0, 2)],
      [new Cell(1, 0), new Cell(1, 1), new Cell(1, 2)],
    ];

    const universe = new Universe(populationSeed);

    expect(universe.currentPopulation()).toEqual(expectedPopulation);
  });

  test("count neighbors of cell at address 0,1", () => {
    const expectedLiveNeighborsCount = 2;
    const populationSeed = [[new Cell(0, 0), new Cell(0, 1), new Cell(0, 2)]];
    const resident = new Cell(0, 1);
    const universe = new Universe(populationSeed);

    expect(universe.countLiveNeighborsOf(resident)).toEqual(
      expectedLiveNeighborsCount,
    );
  });

  test("count neighbors of cell at address 0,1 with one neighbor", () => {
    const expectedLiveNeighborsCount = 1;
    const populationSeed = [[new Cell(0, 0), new Cell(0, 1)]];
    const resident = new Cell(0, 1);
    const universe = new Universe(populationSeed);

    expect(universe.countLiveNeighborsOf(resident)).toEqual(
      expectedLiveNeighborsCount,
    );
  });

  test("count neighbors of cell at address 1,1 with 5 neighbors", () => {
    const expectedLiveNeighborsCount = 5;
    const populationSeed = [
      [new Cell(0, 0), new Cell(0, 1), new Cell(0, 2)],
      [new Cell(1, 0), new Cell(1, 1), new Cell(1, 2)],
    ];

    const resident = new Cell(1, 1);
    const universe = new Universe(populationSeed);

    expect(universe.countLiveNeighborsOf(resident)).toEqual(
      expectedLiveNeighborsCount,
    );
  });

  test("count neighbors of cell at address 1,1 with 8 neighbors", () => {
    const expectedLiveNeighborsCount = 8;
    const populationSeed = [
      [new Cell(0, 0), new Cell(0, 1), new Cell(0, 2)],
      [new Cell(1, 0), new Cell(1, 1), new Cell(1, 2)],
      [new Cell(2, 0), new Cell(2, 1), new Cell(2, 2)],
    ];

    const resident = new Cell(1, 1);
    const universe = new Universe(populationSeed);

    expect(universe.countLiveNeighborsOf(resident)).toEqual(
      expectedLiveNeighborsCount,
    );
  });

  test("kill cell with only one neighbor", () => {
    const populationSeed = [[new Cell(0, 0), new Cell(0, 1)]];
    const universe = new Universe(populationSeed);
    const expectedPopulation = [[]];

    universe.nextPopulation(new Cell(0, 1));

    expect(universe.currentPopulation()).toEqual(expectedPopulation);
  });

  test("preserve cell with only two live neighbors", () => {
    const populationSeed = [[new Cell(0, 0), new Cell(0, 1), new Cell(0, 2)]];
    const universe = new Universe(populationSeed);
    const expectedPopulation = [[new Cell(0, 1)]];

    const resident = new Cell(0, 1);

    universe.nextPopulation(resident);

    expect(universe.currentPopulation()).toEqual(expectedPopulation);
  });

  test("preserve cell with three live neighbors", () => {
    const populationSeed = [
      [new Cell(0, 0), new Cell(0, 1), new Cell(0, 2)],
      [new Cell(1, 1)],
    ];
    const universe = new Universe(populationSeed);
    const expectedPopulation = [[new Cell(0, 1)]];

    const resident = new Cell(0, 1);

    universe.nextPopulation(resident);

    expect(universe.currentPopulation()).toEqual(expectedPopulation);
  });

  test("remove cell with more than three live neighbors", () => {
    const populationSeed = [
      [new Cell(0, 0), new Cell(0, 1), new Cell(0, 2)],
      [new Cell(1, 0), new Cell(1, 1)],
    ];
    const universe = new Universe(populationSeed);
    const expectedPopulation = [[]];

    const resident = new Cell(0, 1);

    universe.nextPopulation(resident);

    expect(universe.currentPopulation()).toEqual(expectedPopulation);
  });
});
