import { useState } from "react";

import TaskHeader from "./components/TaskHeader.js";
import { TasksProvider } from "./stores/tasks/TasksContext.js";
import TaskList from "./components/TaskList.js";
import { TaskModalProvider } from "./stores/taskModal/TaskModalContext.js";
import TaskModal from "./components/TaskModal.js";

function App() {
  const [isShow, setShow] = useState(false);

  return (
    <>
      <TasksProvider>
        <TaskModalProvider>
          <TaskHeader isShow={isShow} showToggle={() => setShow(!isShow)} />
          <TaskList isShow={isShow} />
          <TaskModal />
        </TaskModalProvider>
      </TasksProvider>
    </>
  );
}

export default App;
