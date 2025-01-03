import Monitor from "@domain/entities/Monitor";
import Robot from "@domain/entities/Robot";
import Direction from "@domain/enums/Direction";
import Command from "@domain/enums/Command";

describe("Monitor entity", () => {
  it("should initialize with a world", () => {
    const worldSize = { width: 4, height: 8 };
    const { getWorld } = Monitor(worldSize);

    expect(getWorld().width).toEqual(worldSize.width);
    expect(getWorld().height).toEqual(worldSize.height);
  });

  it("should add robots with their position data", () => {
    const { getRobots, addNewRobot } = Monitor({ width: 4, height: 8 });
    const robots = getRobots();
    expect(robots).toHaveLength(0);

    const robot = Robot({ x: 2, y: 3 }, Direction.North);
    addNewRobot(robot);
    expect(robots).toHaveLength(1);
  });

  it("should throw an error if try to add a robot in the same position to another", () => {
    const { addNewRobot } = Monitor({ width: 4, height: 8 });

    const firstRobot = Robot({ x: 2, y: 3 }, Direction.North);
    const handleAddFirstRobot = () => {
      addNewRobot(firstRobot);
    };
    expect(handleAddFirstRobot).not.toThrow();

    const secondRobot = Robot({ x: 2, y: 3 }, Direction.South);
    const handleAddSecondRobot = () => {
      addNewRobot(secondRobot);
    };
    expect(handleAddSecondRobot).toThrow();
  });

  it("should move robot from his position according commands suite and can be find after", () => {
    const { addNewRobot, moveRobotFromPosition, findRobot } = Monitor({
      width: 4,
      height: 8,
    });

    const robot = Robot({ x: 2, y: 3 }, Direction.North);
    addNewRobot(robot);

    const expectedPosition = { x: 2, y: 3 };
    const expectedDirection = Direction.West;
    moveRobotFromPosition(robot.getPosition(), [
      Command.Forward,
      Command.Left,
      Command.Left,
      Command.Forward,
      Command.Right,
    ]);

    expect(robot.getPosition().x).toEqual(expectedPosition.x);
    expect(robot.getPosition().y).toEqual(expectedPosition.y);
    expect(robot.getDirection()).toEqual(expectedDirection);

    const handleFindRobot = () => {
      findRobot(expectedPosition);
    };
    expect(handleFindRobot).not.toThrow();
  });

  it("should automatically remove robot if its new position data are greater than world size", () => {
    const { addNewRobot, moveRobotFromPosition, findRobot } = Monitor({
      width: 4,
      height: 8,
    });

    const robot = Robot({ x: 2, y: 3 }, Direction.East);
    addNewRobot(robot);

    moveRobotFromPosition(robot.getPosition(), [
      Command.Forward,
      Command.Forward,
      Command.Forward,
    ]);

    const invalidPosition = { x: 5, y: 3 };
    const handleFindRobot = () => {
      findRobot(invalidPosition);
    };
    expect(handleFindRobot).toThrow();
  });

  it("should automatically remove robot if its new position data are below 0", () => {
    const { addNewRobot, moveRobotFromPosition, findRobot } = Monitor({
      width: 4,
      height: 8,
    });

    const robot = Robot({ x: 2, y: 3 }, Direction.South);
    addNewRobot(robot);

    moveRobotFromPosition(robot.getPosition(), [
      Command.Forward,
      Command.Forward,
      Command.Forward,
      Command.Forward,
    ]);

    const invalidPosition = { x: 2, y: -1 };
    const handleFindRobot = () => {
      findRobot(invalidPosition);
    };
    expect(handleFindRobot).toThrow();
  });
});
