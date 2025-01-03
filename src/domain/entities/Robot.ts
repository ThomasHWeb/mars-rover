import { Robot, Position } from "../types";
import Direction from "../enums/Direction";

export default (
  initialPosition: Position,
  initialOrientation: Direction,
): Robot => {
  const position: Position = { x: initialPosition.x, y: initialPosition.y };
  let direction: Direction = initialOrientation;

  const moveForward = (): void => {
    switch (direction) {
      case Direction.North:
        position.y++;
        break;
      case Direction.East:
        position.x++;
        break;
      case Direction.South:
        position.y--;
        break;
      case Direction.West:
        position.x--;
        break;
      default:
        throw new Error("Something wrong with robot direction");
    }
  };

  const turnRight = (): void => {
    switch (direction) {
      case Direction.North:
        direction = Direction.East;
        break;
      case Direction.East:
        direction = Direction.South;
        break;
      case Direction.South:
        direction = Direction.West;
        break;
      case Direction.West:
        direction = Direction.North;
        break;
      default:
        throw new Error("Something wrong with robot direction");
    }
  };

  const turnLeft = (): void => {
    switch (direction) {
      case Direction.North:
        direction = Direction.West;
        break;
      case Direction.West:
        direction = Direction.South;
        break;
      case Direction.South:
        direction = Direction.East;
        break;
      case Direction.East:
        direction = Direction.North;
        break;
      default:
        throw new Error("Something wrong with robot direction");
    }
  };

  const getPosition = (): Position => position;
  const getDirection = (): string => direction;

  return {
    getPosition,
    getDirection,
    moveForward,
    turnRight,
    turnLeft,
  };
};
