import { Position, WorldInterface } from "@domain/types";
import Direction from "@domain/enums/Direction";
import Command from "@domain/enums/Command";

const regex = /\((\d+),\s*(\d+),\s*([A-Z])\)\s*([FLR]+)/;

export default class Input {
  private readonly position: Position;
  private readonly direction: Direction;
  private readonly commands: Command[];

  constructor(input: string, world: WorldInterface) {
    const match = input.match(regex);
    if (!match) {
      throw new Error("Invalid input format");
    }

    this.position = {
      x: Number(match[1]),
      y: Number(match[2]),
    };

    if (this.position.x < 0 || this.position.x > world.width) {
      throw new Error(`Value x must be in correct range 0-${world.width}`);
    }

    if (this.position.y < 0 || this.position.y > world.height) {
      throw new Error(`Value y must be in correct range 0-${world.height}`);
    }

    this.direction = match[3] as Direction;
    this.commands = match[4].split("") as Command[];
  }

  getPosition(): Position {
    return this.position;
  }

  getDirection(): Direction {
    return this.direction;
  }

  getCommands(): Command[] {
    return this.commands;
  }
}
