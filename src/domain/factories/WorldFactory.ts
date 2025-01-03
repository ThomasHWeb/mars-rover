import { WorldInterface } from "../types";
import World from "../entities/World";

export default () => {
  const create = (width: number, height: number): WorldInterface => {
    if (width <= 0 || height <= 0) {
      throw new Error("Cannot initialize grid. values must be greater than 0");
    }

    return World(width, height);
  };

  return {
    create,
  };
};
