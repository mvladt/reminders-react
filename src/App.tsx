import { TasksProvider } from "./stores/tasks/TasksContext.js";
import { TaskModalProvider } from "./stores/taskModal/TaskModalContext.js";
import TaskWrapper from "./components/TaskWrapper.js";

function App() {
  return (
    <>
      <TasksProvider>
        <TaskModalProvider>
          <TaskWrapper />
        </TaskModalProvider>
      </TasksProvider>
    </>
  );
}

export default App;
