import Robot from "@domain/entities/Robot";
import Direction from "@domain/enums/Direction";
import { Position } from "@domain/types";

describe("Robot entity", () => {
  it("should created with initial with correct position and direction", () => {
    const initialPosition: Position = { x: 1, y: 1 };
    const robot = Robot(initialPosition, Direction.North);

    expect(robot.getPosition()).toEqual(initialPosition);
    expect(robot.getDirection()).toEqual(Direction.North);
  });

  it("should change position when it move forward to North", () => {
    const initialPosition = { x: 1, y: 1 };
    const robot = Robot(initialPosition, Direction.North);

    expect(robot.getPosition()).toEqual(initialPosition);

    robot.moveForward();
    expect(robot.getPosition()).toEqual({
      x: initialPosition.x,
      y: initialPosition.y + 1,
    });
  });

  it("should change position when it move forward to East", () => {
    const initialPosition: Position = { x: 1, y: 1 };
    const robot = Robot(initialPosition, Direction.East);

    expect(robot.getPosition()).toEqual(initialPosition);

    robot.moveForward();
    expect(robot.getPosition()).toEqual({
      x: initialPosition.x + 1,
      y: initialPosition.y,
    });
  });

  it("should change position when it move forward to South", () => {
    const initialPosition: Position = { x: 1, y: 1 };
    const robot = Robot(initialPosition, Direction.South);

    expect(robot.getPosition()).toEqual(initialPosition);

    robot.moveForward();
    expect(robot.getPosition()).toEqual({
      x: initialPosition.x,
      y: initialPosition.y - 1,
    });
  });

  it("should change position when it move forward to West", () => {
    const initialPosition: Position = { x: 1, y: 1 };
    const robot = Robot(initialPosition, Direction.West);

    expect(robot.getPosition()).toEqual(initialPosition);

    robot.moveForward();
    expect(robot.getPosition()).toEqual({
      x: initialPosition.x - 1,
      y: initialPosition.y,
    });
  });

  it("should change direction correctly when it turns to 90 degrees to right", () => {
    const initialOrientation = Direction.North;
    const robot = Robot({ x: 1, y: 1 }, initialOrientation);

    expect(robot.getDirection()).toEqual(initialOrientation);

    robot.turnRight();
    expect(robot.getDirection()).toEqual(Direction.East);

    robot.turnRight();
    expect(robot.getDirection()).toEqual(Direction.South);

    robot.turnRight();
    expect(robot.getDirection()).toEqual(Direction.West);

    robot.turnRight();
    expect(robot.getDirection()).toEqual(Direction.North);
  });

  it("should change direction correctly when it turns to 90 degrees to left", () => {
    const initialOrientation = Direction.North;
    const robot = Robot({ x: 1, y: 1 }, initialOrientation);

    expect(robot.getDirection()).toEqual(initialOrientation);

    robot.turnLeft();
    expect(robot.getDirection()).toEqual(Direction.West);

    robot.turnLeft();
    expect(robot.getDirection()).toEqual(Direction.South);

    robot.turnLeft();
    expect(robot.getDirection()).toEqual(Direction.East);

    robot.turnLeft();
    expect(robot.getDirection()).toEqual(Direction.North);
  });
});
