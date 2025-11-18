import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ActionDispatch,
  type PropsWithChildren,
} from "react";

import {
  getStateFromLocal,
  saveStateToLocal,
} from "../../tools/tasksLocalStore.js";
import tasksActions from "./tasksActions.js";
import tasksReducer from "./tasksReducer.js";

import type { TaskAction, TaskEntity } from "../../types.js";

type ProvidedValue = {
  dispatch: ActionDispatch<[TaskAction]>;
  tasks: TaskEntity[];
  actions: typeof tasksActions;
  completed: TaskEntity[];
  uncompleted: TaskEntity[];
  numberOfCompleted: number;
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
    dispatch,
    tasks: sortedTasks,
    actions: tasksActions,
    completed: completedTasks,
    uncompleted: uncompletedTasks,
    numberOfCompleted,
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
