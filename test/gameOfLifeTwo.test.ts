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
    let liveNeighborsCount: number = 0;
    for (let cellIndex = 0; cellIndex < this.population.length; cellIndex++) {
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
    }
    if (liveNeighborsCount < 2) {
      this.population = [];
    }
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
    // _ X _ --> _ _ _

    let seed = [new _Cell(1, 0)];
    let universe = new _Universe(seed);

    universe.evolve();

    expect(universe.isAlive(1, 0)).toEqual(false);
  });

  test("Cell is alive at 0,2 is true because two neighbors", () => {
    // XXX --> _ X _

    let seed = [new _Cell(0, 0), new _Cell(1, 0), new _Cell(2, 0)];
    let universe = new _Universe(seed);

    universe.evolve();

    expect(universe.isAlive(1, 0)).toEqual(true);
  });
});
