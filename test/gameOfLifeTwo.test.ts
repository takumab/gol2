class _Cell {
  constructor(
    public x: number,
    public y: number,
  ) {}
}

class _Universe {
  constructor(seed: _Cell[][]) {}

  evolve() {}

  isAlive(x: number, y: number): boolean {
    return false;
  }
}

describe("Game Of Life Should", () => {
  test("Cell is alive at 0,2 is false because not enough neighbors", () => {
    // _ X _ --> _ _ _
    // _ _ _ --> _ _ _
    // _ _ _ --> _ _ _

    let seed = [[new _Cell(0, 2)]];
    let universe = new _Universe(seed);

    universe.evolve();

    expect(universe.isAlive(0, 2)).toEqual(false);
  });
});
