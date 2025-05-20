- Goal, remove Address and use Cell
  - [X] Cell constructor should take x and y
    - [X] Cell should x and y properties instead of the `address` field/property
      - [X] `areNeighborsInUniverse` should take resident 
      - [X] `areNeighborsInUniverse` should not take a residentAddress
        - [X] population should take resident
  - [X] Cell constructor should not take `Address`

- Goal, Remove `Neigbhors` class
  - [X] remove neighbors property
    - [X] remove neighbors from constructor
    - [X] move count into Universe
    - [X] Universe should not take `Neighbors` in constructor
    - [X] should be removed from all tests
  - [X] count should use neighborsPositions from Cell 
    - [X] Cell should return `neigborsPositions`
      - [X] `count()` in Universe should take the `neighborsPositions`
        - [X] `count()` should not take `neighborsPositions`
      - [X] `countNeighborsOf` should not have neighborsPositions collection
  - [X] `count()` should not take `population`
  - [X] `count()` should be called `countLiveNeighborsOf()`
    - [X] `countLiveNeighborsOf()` should take a Cell
  - [X] `areNeighborsInUniverse` should live in the Universe
    - [X] `areNeighborsInUniverse` should take x and y
  - [X] `areNeighborsInUniverse` should not take population
    - [X] `areNeighborsInUniverse` should use the population property in Universe
  - [X] test should use `countLiveNeighborsOf`
  - [X] test should not use `countNeighborsOf`

## Goal - Have `nextPopulation` return a new Universe with the next popluation
- [X] `nextPopulation` should return a new Universe
  - [X] Universe should take a new population 
- [X] `nextPopulation` should check if a live cell has fewer than two live neighbors
- [X] `nextPopulation` should check if a live cell has two or three live neighbors
- [X] `nextPopulation` should check if a live cell has more than three live neighbors
- [ ] `nextPopulation` should check if a dead cell has exactly three live neighbors

- [ ] people should be cells in `removeLiveNeighborsOf`
  - [ ] person should be cell
- [ ] `removeLiveNeighborsOf` should do the pop() operation on population
