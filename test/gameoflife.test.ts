class Universe {
  private population: Cell[][];
  constructor(populationSeed: Cell[][]) {
    this.population = populationSeed;
  }

  currentPopulation() {
    return this.population;
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
});
