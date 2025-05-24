class _Cell {
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

  constructor(
    public x: number,
    public y: number,
  ) {}

  getNeighborsPositions() {
    return this.neighborsPositions.map((position) => [
      this.x + position[0],
      this.y + position[1],
    ]);
  }

  isAt(x: number, y: number) {
    return this.x === x && this.y === y;
  }
}

class _Universe {
  private population: _Cell[];
  constructor(seed: _Cell[]) {
    this.population = seed;
  }

  evolve() {
    let newPopulation: _Cell[] = [];
    for (let cellIndex = 0; cellIndex < this.population.length; cellIndex++) {
      let liveNeighborsCount = this.countLiveNeighbors(cellIndex);
      if (liveNeighborsCount === 2 || liveNeighborsCount === 3) {
        newPopulation.push(this.population[cellIndex]);
      }
    }
    this.population = newPopulation;
  }

  private countLiveNeighbors(cellIndex: number) {
    let liveNeighborsCount: number = 0;
    let cell = this.population[cellIndex];
    const neighborsPositions = cell.getNeighborsPositions();
    for (
      let neighborIndex = 0;
      neighborIndex < neighborsPositions.length;
      neighborIndex++
    ) {
      let neighbor = neighborsPositions[neighborIndex];
      let x = neighbor[0];
      let y = neighbor[1];
      if (this.isAlive(x, y)) {
        liveNeighborsCount++;
      }
    }
    return liveNeighborsCount;
  }

  isAlive(x: number, y: number): boolean {
    for (let i = 0; i < this.population.length; i++) {
      let cell = this.population[i];
      if (cell.isAt(x, y)) {
        return true;
      }
    }
    return false;
  }
}

describe("Game Of Life Should", () => {
  test("Cell is alive at 0,2 is false because not enough neighbors", () => {
    // _X_ --> ___

    let seed = [new _Cell(1, 0)];
    let universe = new _Universe(seed);

    universe.evolve();

    expect(universe.isAlive(1, 0)).toEqual(false);
  });

  test("Cell is alive at 0,2 is true because two neighbors", () => {
    // XXX --> _X_

    let seed = [new _Cell(0, 0), new _Cell(1, 0), new _Cell(2, 0)];
    let universe = new _Universe(seed);

    universe.evolve();

    expect(universe.isAlive(1, 0)).toEqual(true);
  });

  test("Cell is alive at 1,1 is true because three live neighbors", () => {
    // X_X --> ___
    // _X_ --> _X_
    // X__ --> ___

    let seed = [
      new _Cell(0, 0),
      new _Cell(1, 1),
      new _Cell(0, 2),
      new _Cell(2, 2),
    ];

    let universe = new _Universe(seed);

    universe.evolve();

    expect(universe.isAlive(1, 1)).toEqual(true);
    expect(universe.isAlive(0, 0)).toEqual(false);
    expect(universe.isAlive(0, 2)).toEqual(false);
    expect(universe.isAlive(2, 2)).toEqual(false);
  });

  test("Cell is dead at 1,1 is false because has more than three live neighbors", () => {
    // X_X --> ___
    // _X_ --> ___
    // X_X --> ___

    let seed = [
      new _Cell(0, 0),
      new _Cell(1, 1),
      new _Cell(0, 2),
      new _Cell(2, 2),
      new _Cell(2, 0),
    ];

    let universe = new _Universe(seed);

    universe.evolve();

    expect(universe.isAlive(1, 1)).toEqual(false);
  });
});
