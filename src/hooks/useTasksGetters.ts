import { useMemo } from "react";

import { useTasksStore } from "../stores/tasks/TasksContext";
import type { TaskEntity } from "../types";

type ProvidedValue = {
  sorted: TaskEntity[];
  completed: TaskEntity[];
  uncompleted: TaskEntity[];
  numberOfCompleted: number;
};

export function useTasksGetters(): ProvidedValue {
  const { tasks } = useTasksStore();

  // Сначала незавершенные, потом завершенные.
  const sorted = useMemo(
    () => [
      ...tasks.filter((t) => !t.completed),
      ...tasks.filter((t) => t.completed),
    ],
    [tasks]
  );
  const completed = useMemo(() => tasks.filter((t) => t.completed), [tasks]);
  const uncompleted = useMemo(() => tasks.filter((t) => !t.completed), [tasks]);
  const numberOfCompleted = useMemo(
    () => tasks.filter((t) => t.completed).length || 0,
    [tasks]
  );

  return {
    sorted,
    completed,
    uncompleted,
    numberOfCompleted,
  };
}
