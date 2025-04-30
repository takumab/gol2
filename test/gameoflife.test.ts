class Universe {
  private population: Cell[][];
  private neighbors: Neighbors;

  constructor(populationSeed: Cell[][], neighbors: Neighbors) {
    this.neighbors = neighbors;
    this.population = populationSeed;
  }

  currentPopulation() {
    return this.population;
  }

  countNeighborsOf(resident: Cell) {
    return this.neighbors.count(resident, this.population);
  }

  nextPopulation() {
    this.population = [[]];
  }
}

// Man in the middle
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
  private x: number;
  private y: number;
  constructor(address: Address) {
    this.address = address;
    this.x = address.x;
    this.y = address.y;
  }
  getAddress() {
    return this.address;
  }
}

class Neighbors {
  private x: number;
  private y: number;
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
      this.x = neighborsPositions[neighborsPositionIndex][0];
      this.y = neighborsPositions[neighborsPositionIndex][1];
      if (this.areNeighborsInUniverse(population, residentAddress)) {
        liveNeighborsCount++;
      }
    }
    return liveNeighborsCount;
  }

  // Primitive Obsession
  // Long Parameter
  // Data Clump
  private areNeighborsInUniverse(
    population: Cell[][],
    residentAddress: Address,
  ) {
    return (
      population[residentAddress.x + this.x] !== undefined &&
      population[residentAddress.x + this.x][residentAddress.y + this.y] !==
        undefined
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

    const neighbors = new Neighbors();
    const universe = new Universe(populationSeed, neighbors);

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

    const neighbors = new Neighbors();
    const universe = new Universe(populationSeed, neighbors);

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
    const universe = new Universe(populationSeed, neighbors);

    expect(universe.countNeighborsOf(resident)).toEqual(
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
    const universe = new Universe(populationSeed, neighbors);

    expect(universe.countNeighborsOf(resident)).toEqual(
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
    const universe = new Universe(populationSeed, neighbors);

    expect(universe.countNeighborsOf(resident)).toEqual(
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
    const universe = new Universe(populationSeed, neighbors);

    expect(universe.countNeighborsOf(resident)).toEqual(
      expectedLiveNeighborsCount,
    );
  });

  test("kill cell with only one neighbor", () => {
    const populationSeed = [
      [new Cell(new Address(0, 0)), new Cell(new Address(0, 1))],
    ];
    const neighbors = new Neighbors();
    const universe = new Universe(populationSeed, neighbors);
    const expectedPopulation = [[]];

    universe.nextPopulation();

    expect(universe.currentPopulation()).toEqual(expectedPopulation);
  });

  test("preserve cell with only two live neighbors", () => {
    const populationSeed = [
      [
        new Cell(new Address(0, 0)),
        new Cell(new Address(0, 1)),
        new Cell(new Address(0, 2)),
      ],
    ];
    const neighbors = new Neighbors();
    const universe = new Universe(populationSeed, neighbors);
    const expectedPopulation = [[]];

    universe.nextPopulation();

    expect(universe.currentPopulation()).toEqual(expectedPopulation);
  });
});
