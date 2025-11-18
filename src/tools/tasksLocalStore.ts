import type { TaskEntity } from "../types";

export const getStateFromLocal = (): TaskEntity[] => {
  return JSON.parse(localStorage.getItem("tasks")) || [];
};

export const saveStateToLocal = (state: TaskEntity[]) => {
  localStorage.setItem("tasks", JSON.stringify(state));
};
