import { WorldInterface } from "../types";

export default (width: number, height: number): WorldInterface => {
  return {
    width,
    height,
  };
};
