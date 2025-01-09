import * as readline from "node:readline";
import Monitor from "@domain/entities/Monitor";
import Input from "@infra/node/dto/input";
import Robot from "@domain/entities/Robot";
import {
  Monitor as MonitorInterface,
  Position,
  Robot as RobotInterface,
} from "@domain/types";
import Command from "@domain/enums/Command";

export default () => {
  let monitor: MonitorInterface;

  const initializeMonitor = (input: string): MonitorInterface => {
    const [width, height] = input.split(" ").map(Number);
    if (isNaN(width) || isNaN(height)) {
      throw new Error("Values must be numbers");
    }

    if (width < 0 || height < 0) {
      throw new Error("Values must be greater than 0");
    }

    return Monitor({ width, height });
  };

  const moveRobotAndFindIt = (
    robotPosition: Position,
    commands: Command[],
  ): RobotInterface | undefined => {
    try {
      const robot = monitor.findRobot(robotPosition);
      monitor.moveRobotFromPosition(robot.getPosition(), commands);

      return monitor.findRobot(robot.getPosition());
    } catch (error) {
      return undefined;
    }
  };

  const createAndAddRobot = (inputDTO: Input): Position => {
    const robot = Robot(inputDTO.getPosition(), inputDTO.getDirection());
    monitor.addNewRobot(robot);

    return robot.getPosition();
  };

  const createResponse = (
    robot: RobotInterface | undefined,
    inputDTO: Input,
  ): string => {
    return robot
      ? `(${robot.getPosition().x}, ${robot.getPosition().y}, ${robot.getDirection()})`
      : `(${inputDTO.getPosition().x}, ${inputDTO.getPosition().y}, ${inputDTO.getDirection()}) LOST`;
  };

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question(
    "Enter new world size (width, height): ",
    (input: string): void => {
      try {
        monitor = initializeMonitor(input);

        rl.question(
          "Enter robot position, direction and commands (x, y, D) FLR: ",
          (input: string): void => {
            try {
              const inputDTO = new Input(input, monitor.getWorld());
              createAndAddRobot(inputDTO);

              const robot = moveRobotAndFindIt(
                inputDTO.getPosition(),
                inputDTO.getCommands(),
              );

              console.log(createResponse(robot, inputDTO));
            } catch (error) {
              console.error(error instanceof Error ? error.message : error);
            }
          },
        );
      } catch (error) {
        console.error(error instanceof Error ? error.message : error);
      }
    },
  );
};
