import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type PropsWithChildren,
} from "react";

import {
  getStateFromLocal,
  saveStateToLocal,
} from "../../tools/tasksLocalStore.js";
import tasksReducer from "./tasksReducer.js";

import type { TaskAction, TaskEntity } from "../../types.js";

type ProvidedValue = {
  tasks: TaskEntity[];
  completed: TaskEntity[];
  uncompleted: TaskEntity[];
  numberOfCompleted: number;

  createOne(task: TaskEntity): void;
  updateOne(task: Partial<TaskEntity>): void;
  deleteOne(task: Partial<TaskEntity>): void;
  deleteCompletedOnes(): void;
};

const initialTasks = getStateFromLocal();

const TasksContext = createContext<ProvidedValue>({});

export function TasksProvider({ children }: PropsWithChildren) {
  const [tasks, dispatch] = useReducer<TaskEntity[], [TaskAction]>(
    tasksReducer,
    initialTasks
  );

  // Сначала незавершенные, потом завершенные.
  const sortedTasks = useMemo(
    () => [
      ...tasks.filter((t) => !t.completed),
      ...tasks.filter((t) => t.completed),
    ],
    [tasks]
  );
  const completedTasks = useMemo(
    () => tasks.filter((t) => t.completed),
    [tasks]
  );
  const uncompletedTasks = useMemo(
    () => tasks.filter((t) => !t.completed),
    [tasks]
  );
  const numberOfCompleted = useMemo(
    () => tasks.filter((t) => t.completed).length || 0,
    [tasks]
  );

  useEffect(() => saveStateToLocal(tasks), [tasks]);

  const providedValue: ProvidedValue = {
    tasks: sortedTasks,
    completed: completedTasks,
    uncompleted: uncompletedTasks,
    numberOfCompleted,

    createOne(task) {
      dispatch({ type: "create-one", value: task });
    },
    updateOne(task) {
      dispatch({ type: "update-one", value: task });
    },
    deleteOne(task) {
      dispatch({ type: "delete-one", value: task });
    },
    deleteCompletedOnes() {
      dispatch({ type: "delete-completed-ones" });
    },
  };

  return (
    <TasksContext.Provider value={providedValue}>
      {children}
    </TasksContext.Provider>
  );
}

export function useTasksStore() {
  return useContext(TasksContext);
}
