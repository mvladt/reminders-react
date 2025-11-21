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

  useEffect(() => saveStateToLocal(tasks), [tasks]);

  const providedValue: ProvidedValue = {
    tasks,
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
