class Universe {
  private population: Cell[][];
  private liveNeighborsCount = 0;

  constructor(populationSeed: Cell[][]) {
    this.population = populationSeed;
  }

  currentPopulation() {
    return this.population;
  }

  countLiveNeighborsOf(resident: Cell) {
    const neighborsPositions = resident.getNeighborsPositions();
    for (
      let neighborsPositionIndex = 0;
      neighborsPositionIndex < neighborsPositions.length;
      neighborsPositionIndex++
    ) {
      let x = neighborsPositions[neighborsPositionIndex][0];
      let y = neighborsPositions[neighborsPositionIndex][1];
      if (this.areNeighborsInUniverse(resident, x, y)) {
        this.liveNeighborsCount++;
      }
    }
    return this.liveNeighborsCount;
  }
  nextPopulation() {
    if (this.isLiveCellWithTwoOrThreeLiveNeighbors()) {
      this.population = [[new Cell(0, 1)]];
      return;
    }
    this.population = [[]];
  }

  private isLiveCellWithTwoOrThreeLiveNeighbors() {
    return this.liveNeighborsCount === 2 || this.liveNeighborsCount === 3;
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

    universe.nextPopulation();

    expect(universe.currentPopulation()).toEqual(expectedPopulation);
  });

  test("preserve cell with only two live neighbors", () => {
    const populationSeed = [[new Cell(0, 0), new Cell(0, 1), new Cell(0, 2)]];
    const universe = new Universe(populationSeed);
    const expectedPopulation = [[new Cell(0, 1)]];

    const resident = new Cell(0, 1);

    universe.countLiveNeighborsOf(resident);
    universe.nextPopulation();

    expect(universe.currentPopulation()).toEqual(expectedPopulation);
  });

  test("preserve cell with only three live neighbors", () => {
    const populationSeed = [
      [new Cell(0, 0), new Cell(0, 1), new Cell(0, 2)],
      [new Cell(1, 1)],
    ];
    const universe = new Universe(populationSeed);
    const expectedPopulation = [[new Cell(0, 1)]];

    const resident = new Cell(0, 1);

    universe.countLiveNeighborsOf(resident);
    universe.nextPopulation();

    expect(universe.currentPopulation()).toEqual(expectedPopulation);
  });
});
