class Universe {
  private population: Cell[][];
  constructor(populationSeed: Cell[][]) {
    this.population = populationSeed;
  }

  currentPopulation() {
    return this.population;
  }

  countNeighborsOf(resident: Cell, neighbors: Neighbors) {
    const residentAddress = resident.getAddress();
    const neighborsPositions = neighbors.getNeighborsPositions();
    let liveNeighborsCount = 0;
    for (
      let neighborsPositionIndex = 0;
      neighborsPositionIndex < neighborsPositions.length;
      neighborsPositionIndex++
    ) {
      let x = neighborsPositions[neighborsPositionIndex][0];
      let y = neighborsPositions[neighborsPositionIndex][1];
      if (
        this.population[residentAddress.x + x] !== undefined &&
        this.population[residentAddress.x + x][residentAddress.y + y] !==
          undefined
      ) {
        liveNeighborsCount++;
      }
    }
    return liveNeighborsCount;
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

  getNeighborsPositions() {
    return this.neighborsPositions;
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
});
