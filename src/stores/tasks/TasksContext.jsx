import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";

import tasksActions from "./tasksActions.js";
import tasksReducer from "./tasksReducer.js";
import {
  getStateFromLocal,
  saveStateToLocal,
} from "../../tools/tasksLocalStore.js";

const initialTasks = getStateFromLocal();

const TasksContext = createContext();

export function TasksProvider({ children }) {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

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

  const toProvide = {
    dispatch,
    tasks: sortedTasks,
    actions: tasksActions,
    completed: completedTasks,
    uncompleted: uncompletedTasks,
    numberOfCompleted,
  };

  return (
    <TasksContext.Provider value={toProvide}>{children}</TasksContext.Provider>
  );
}

export function useTasksStore() {
  return useContext(TasksContext);
}
