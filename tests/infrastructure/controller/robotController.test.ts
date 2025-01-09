import { jest } from "@jest/globals";
import Monitor from "@domain/entities/Monitor";
import Input from "@infra/node/dto/input";
import Command from "@domain/enums/Command";
import readline from "node:readline";
import robotController from "@infra/node/controller/RobotController";
import Direction from "@domain/enums/Direction";
import Robot from "@domain/entities/Robot";

jest.mock("node:readline");
jest.mock("@domain/entities/Monitor");
jest.mock("@domain/entities/Robot");
jest.mock("@infra/node/dto/input");

const monitorMock = {
  getWorld: jest.fn(),
  addNewRobot: jest.fn(),
  findRobot: jest.fn(),
  moveRobotFromPosition: jest.fn(),
};
const robotMock = {
  getPosition: jest.fn().mockReturnValue({ x: 1, y: 1 }),
  getDirection: jest.fn().mockReturnValue(Direction.East),
};

describe("Robot Controller", () => {
  let ReadlineMock: any;

  beforeEach(() => {
    jest.clearAllMocks();

    ReadlineMock = {
      question: jest.fn(),
      close: jest.fn(),
    };
    (readline.createInterface as jest.Mock).mockReturnValue(ReadlineMock);
    (Monitor as jest.Mock).mockReturnValue(monitorMock);
    (Robot as jest.Mock).mockReturnValue(robotMock);
  });

  it("should create monitor with correct dimensions", () => {
    const input = "5 3";
    ReadlineMock.question.mockImplementationOnce(
      (_: string, callback: (answer: string) => void) => callback(input),
    );

    robotController();

    expect(Monitor).toHaveBeenCalledWith({
      width: 5,
      height: 3,
    });
  });

  it("should handle valid robot movement successfully", () => {
    const worldInput = "5 3";
    const robotInput = "(1, 1, E) RFRFRFRF";

    monitorMock.findRobot.mockReturnValue(robotMock);
    const mockInputDTO = {
      getPosition: jest.fn().mockReturnValue({ x: 1, y: 1 }),
      getDirection: jest.fn().mockReturnValue(Direction.East),
      getCommands: jest.fn().mockReturnValue([Command.Right, Command.Forward]),
    };
    (Input as jest.Mock).mockImplementation(() => mockInputDTO);

    ReadlineMock.question
      .mockImplementationOnce((_: string, callback: (answer: string) => void) =>
        callback(worldInput),
      )
      .mockImplementationOnce((_: string, callback: (answer: string) => void) =>
        callback(robotInput),
      );

    const consoleSpy = jest.spyOn(console, "log");

    robotController();

    expect(monitorMock.addNewRobot).toHaveBeenCalled();
    expect(monitorMock.moveRobotFromPosition).toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledWith("(1, 1, E)");
  });

  it("should handle lost robot scenario", () => {
    const worldInput = "5 3";
    const robotInput = "(3, 2, N) FRRFLLFFRRFLL";

    monitorMock.findRobot
      .mockReturnValueOnce({
        getPosition: jest.fn().mockReturnValue({ x: 3, y: 2 }),
      })
      .mockReturnValueOnce(undefined);

    const mockInputDTO = {
      getPosition: jest.fn().mockReturnValue({ x: 3, y: 2 }),
      getDirection: jest.fn().mockReturnValue(Direction.North),
      getCommands: jest.fn().mockReturnValue([Command.Forward, Command.Right]),
    };
    (Input as jest.Mock).mockImplementation(() => mockInputDTO);

    ReadlineMock.question
      .mockImplementationOnce((_: string, callback: (answer: string) => void) =>
        callback(worldInput),
      )
      .mockImplementationOnce((_: string, callback: (answer: string) => void) =>
        callback(robotInput),
      );

    const consoleSpy = jest.spyOn(console, "log");

    robotController();

    expect(consoleSpy).toHaveBeenCalledWith("(3, 2, N) LOST");
  });

  it("should handle invalid input errors", () => {
    const worldInput = "5 3";
    const robotInput = "invalid input";
    const mockError = new Error("Invalid input");

    (Input as jest.Mock).mockImplementation(() => {
      throw mockError;
    });

    ReadlineMock.question
      .mockImplementationOnce((_: string, callback: (answer: string) => void) =>
        callback(worldInput),
      )
      .mockImplementationOnce((_: string, callback: (answer: string) => void) =>
        callback(robotInput),
      );

    const consoleErrorSpy = jest.spyOn(console, "error");

    robotController();

    expect(consoleErrorSpy).toHaveBeenCalledWith("Invalid input");
  });

  it("should handle monitor initialization errors", () => {
    const invalidInput = "invalid";
    ReadlineMock.question.mockImplementationOnce(
      (_: string, callback: (answer: string) => void) => callback(invalidInput),
    );

    const consoleErrorSpy = jest.spyOn(console, "error");

    robotController();

    expect(consoleErrorSpy).toHaveBeenCalled();
  });
});
