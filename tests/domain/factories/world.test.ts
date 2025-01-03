import WorldFactory from "@domain/factories/WorldFactory";

describe("World factory", () => {
  it("should create World entity correctly", () => {
    const width = 4;
    const height = 8;

    const { create } = WorldFactory();
    const world = create(width, height);

    expect(world.width).toEqual(width);
    expect(world.height).toEqual(height);
  });

  it("should throw an error if width or height are not greater than 0", () => {
    const createWorldWithError = (width: number, height: number): void => {
      const { create } = WorldFactory();
      create(width, height);
    };

    expect(() => createWorldWithError(0, 0)).toThrow();
    expect(() => createWorldWithError(0, 8)).toThrow();
    expect(() => createWorldWithError(4, 0)).toThrow();
    expect(() => createWorldWithError(-4, 8)).toThrow();
    expect(() => createWorldWithError(4, -8)).toThrow();
  });
});
