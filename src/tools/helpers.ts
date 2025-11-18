import type { TaskEntity } from "../types";

export const createTask = (
  title: string = "",
  text: string = ""
): TaskEntity => {
  return { id: dumbUUID(), title, text, completed: false, datetime: "" };
};

export const dumbUUID = (): string => {
  return `id-${Date.now().toString(16)}-${Math.random().toString(16).slice(2)}`;
};

export const sleep = async (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
