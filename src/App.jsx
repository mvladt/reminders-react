import { useState } from "react";

import TaskHeader from "./components/TaskHeader.jsx";
import { TasksProvider } from "./stores/tasks/TasksContext.jsx";
import TaskList from "./components/TaskList.jsx";
import { TaskModalProvider } from "./stores/taskModal/TaskModalContext.jsx";
import TaskModal from "./components/TaskModal.jsx";

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
