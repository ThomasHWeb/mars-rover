# Mars Rover

A program that takes commands and moves one or more robots on Mars.
This project is written with TypeScript.

## Features

- The world is modeled as an W x H grid.
- The program reads input, updates the robots, and outputs the final states of the robots.
- Each robot has a position (x, y) and an orientation N, E, S, W.
- Each robot can move forward one space (F), turn left 90 degrees (L), or turn right 90 degrees (R).
- If a robot moves off the grid, it is marked as "lost" and its last valid position and orientation are recorded.
- Moving from x → x + 1 is eastward, and y → y + 1 is northward. 0, 0 represents the southwest corner of the grid.

## Usage

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Build project using `npm build`.
4. Run the program using `npm start`.

## Input Format

The program expects input in the following format:
- `w h` are the dimensions of the grid.
- `x y orientation` is the initial position and orientation of a robot.
- `commands` are the commands for the robot.

```
4 8
(2, 3, E) LFRFF
(0, 2, N) FFLFRFF
```

## Output Format

The program outputs the final states of the robots in the following format:
- `x y orientation` is the final position and orientation of a robot.
- `status` is either empty or "LOST" if the robot moved off the grid.

```
(4, 4, E)
(0, 4, W) LOST
```
