class Universe {
  private population: Cell[][];
  constructor(populationSeed: Cell[][]) {
    this.population = populationSeed;
  }

  currentPopulation() {
    return this.population;
  }

  countNeighborsOf(resident: Cell, neighbors: Neighbors) {
    return neighbors.count(resident, this.population);
  }
}

class Address {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

class Cell {
  private address: Address;
  constructor(address: Address) {
    this.address = address;
  }
  getAddress() {
    return this.address;
  }
}

class Neighbors {
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

  count(resident: Cell, population: Cell[][]) {
    const residentAddress = resident.getAddress();
    const neighborsPositions = this.neighborsPositions;
    let liveNeighborsCount = 0;
    for (
      let neighborsPositionIndex = 0;
      neighborsPositionIndex < neighborsPositions.length;
      neighborsPositionIndex++
    ) {
      let x = neighborsPositions[neighborsPositionIndex][0];
      let y = neighborsPositions[neighborsPositionIndex][1];
      if (this.neighborsAreInUniverse(population, residentAddress, x, y)) {
        liveNeighborsCount++;
      }
    }
    return liveNeighborsCount;
  }

  // Primitive Obsession
  // Long method
  private neighborsAreInUniverse(
    population: Cell[][],
    residentAddress: Address,
    x: number,
    y: number,
  ) {
    return (
      population[residentAddress.x + x] !== undefined &&
      population[residentAddress.x + x][residentAddress.y + y] !== undefined
    );
  }
}

describe("Game Of Life Should", () => {
  test("take population seed of size 3", () => {
    const expectedPopulation = [
      [
        new Cell(new Address(0, 0)),
        new Cell(new Address(0, 1)),
        new Cell(new Address(0, 2)),
      ],
    ];

    const populationSeed = [
      [
        new Cell(new Address(0, 0)),
        new Cell(new Address(0, 1)),
        new Cell(new Address(0, 2)),
      ],
    ];

    const universe = new Universe(populationSeed);

    expect(universe.currentPopulation()).toEqual(expectedPopulation);
  });

  test("take population seed of size 6", () => {
    const expectedPopulation = [
      [
        new Cell(new Address(0, 0)),
        new Cell(new Address(0, 1)),
        new Cell(new Address(0, 2)),
      ],
      [
        new Cell(new Address(1, 0)),
        new Cell(new Address(1, 1)),
        new Cell(new Address(1, 2)),
      ],
    ];

    const populationSeed = [
      [
        new Cell(new Address(0, 0)),
        new Cell(new Address(0, 1)),
        new Cell(new Address(0, 2)),
      ],
      [
        new Cell(new Address(1, 0)),
        new Cell(new Address(1, 1)),
        new Cell(new Address(1, 2)),
      ],
    ];

    const universe = new Universe(populationSeed);

    expect(universe.currentPopulation()).toEqual(expectedPopulation);
  });

  test("count neighbors of cell at address 0,1", () => {
    const expectedLiveNeighborsCount = 2;
    const populationSeed = [
      [
        new Cell(new Address(0, 0)),
        new Cell(new Address(0, 1)),
        new Cell(new Address(0, 2)),
      ],
    ];
    const resident = new Cell(new Address(0, 1));
    const neighbors = new Neighbors();
    const universe = new Universe(populationSeed);

    expect(universe.countNeighborsOf(resident, neighbors)).toEqual(
      expectedLiveNeighborsCount,
    );
  });

  test("count neighbors of cell at address 0,1 with one neighbor", () => {
    const expectedLiveNeighborsCount = 1;
    const populationSeed = [
      [new Cell(new Address(0, 0)), new Cell(new Address(0, 1))],
    ];
    const resident = new Cell(new Address(0, 1));
    const neighbors = new Neighbors();
    const universe = new Universe(populationSeed);

    expect(universe.countNeighborsOf(resident, neighbors)).toEqual(
      expectedLiveNeighborsCount,
    );
  });

  test("count neighbors of cell at address 1,1 with 5 neighbors", () => {
    const expectedLiveNeighborsCount = 5;
    const populationSeed = [
      [
        new Cell(new Address(0, 0)),
        new Cell(new Address(0, 1)),
        new Cell(new Address(0, 2)),
      ],
      [
        new Cell(new Address(1, 0)),
        new Cell(new Address(1, 1)),
        new Cell(new Address(1, 2)),
      ],
    ];

    const resident = new Cell(new Address(1, 1));
    const neighbors = new Neighbors();
    const universe = new Universe(populationSeed);

    expect(universe.countNeighborsOf(resident, neighbors)).toEqual(
      expectedLiveNeighborsCount,
    );
  });

  test("count neighbors of cell at address 1,1 with 8 neighbors", () => {
    const expectedLiveNeighborsCount = 8;
    const populationSeed = [
      [
        new Cell(new Address(0, 0)),
        new Cell(new Address(0, 1)),
        new Cell(new Address(0, 2)),
      ],
      [
        new Cell(new Address(1, 0)),
        new Cell(new Address(1, 1)),
        new Cell(new Address(1, 2)),
      ],
      [
        new Cell(new Address(2, 0)),
        new Cell(new Address(2, 1)),
        new Cell(new Address(2, 2)),
      ],
    ];

    const resident = new Cell(new Address(1, 1));
    const neighbors = new Neighbors();
    const universe = new Universe(populationSeed);

    expect(universe.countNeighborsOf(resident, neighbors)).toEqual(
      expectedLiveNeighborsCount,
    );
  });
});
