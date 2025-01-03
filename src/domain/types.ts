import Command from "@domain/enums/Command";

export interface WorldInterface {
  width: Readonly<number>;
  height: Readonly<number>;
}

export type Robot = {
  getPosition: () => { x: number; y: number };
  getDirection: () => string;
  moveForward: () => void;
  turnRight: () => void;
  turnLeft: () => void;
};

export type Monitor = {
  getWorld: () => WorldInterface;
  getRobots: () => Robot[];
  addNewRobot: (newRobot: Robot) => void;
  moveRobotFromPosition: (robotPosition: Position, commands: Command[]) => void;
  findRobot: (position: Position) => Robot;
};

export type Position = { x: number; y: number };
export type WorldSize = { width: number; height: number };
