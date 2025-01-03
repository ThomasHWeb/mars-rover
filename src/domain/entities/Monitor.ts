import WorldFactory from "@domain/factories/WorldFactory";
import {
  Monitor as MonitorType,
  Position,
  Robot,
  WorldInterface,
  WorldSize,
} from "@domain/types";
import Command from "@domain/enums/Command";

export default (worldSize: WorldSize): MonitorType => {
  const world = WorldFactory().create(worldSize.width, worldSize.height);
  let robots: Robot[] = [];

  const getExistingRobotByPositionData = (
    x: number,
    y: number,
  ): Robot | undefined =>
    robots.find(
      (robot: Robot): boolean =>
        robot.getPosition().x === x && robot.getPosition().y === y,
    );

  const validateRobotPosition = (robotToValidate: Robot): void => {
    const existingRobotSamePosition: Robot | undefined =
      getExistingRobotByPositionData(
        robotToValidate.getPosition().x,
        robotToValidate.getPosition().y,
      );

    if (existingRobotSamePosition) {
      throw new Error("Robot cannot have the same position from another");
    }
  };

  const isRobotInWorldValidSize = (robot: Robot): boolean => {
    const position = robot.getPosition();
    return (
      position.x >= 0 &&
      position.x <= world.width &&
      position.y >= 0 &&
      position.x <= world.height
    );
  };

  const addNewRobot = (newRobot: Robot): void => {
    validateRobotPosition(newRobot);
    robots.push(newRobot);
  };

  const findRobot = (position: Position): Robot => {
    const robot = getExistingRobotByPositionData(position.x, position.y);

    if (!robot) {
      throw new Error(
        `Robot cannot be found from these position data. x:${position.x}, y:${position.y}`,
      );
    }

    return robot;
  };

  const executeCommands = (robot: Robot, commands: Command[]): void => {
    commands.forEach((command: Command): void => {
      switch (command) {
        case Command.Forward:
          robot.moveForward();
          break;
        case Command.Left:
          robot.turnLeft();
          break;
        case Command.Right:
          robot.turnRight();
          break;
        default:
          throw new Error("unknown command");
      }
    });
  };

  const moveRobotFromPosition = (
    robotPosition: Position,
    commands: Command[],
  ): void => {
    const robot = findRobot(robotPosition);

    executeCommands(robot, commands);

    if (!isRobotInWorldValidSize(robot)) {
      robots = robots.filter(
        (robotSaved: Robot): boolean =>
          robotSaved.getPosition() !== robot.getPosition(),
      );
    }
  };

  const getWorld = (): WorldInterface => world;
  const getRobots = (): Robot[] => robots;

  return {
    getWorld,
    getRobots,
    addNewRobot,
    moveRobotFromPosition,
    findRobot,
  };
};
