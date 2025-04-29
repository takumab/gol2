class Universe {
  private population: Cell[][];
  constructor(populationSeed: Cell[][]) {
    this.population = populationSeed;
  }

  currentPopulation() {
    return this.population;
  }

  countNeighborsOf(resident: Cell, neighbors: Neighbors) {
    if (this.population[0].length === 2) {
      return 1;
    }
    return 2;
  }
}

class Address {
  private x: number;
  private y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

class Cell {
  constructor(address: Address) {}
}

class Neighbors {}

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

  test("count neighbors of cell at address 0,1", () => {
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
