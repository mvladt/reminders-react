import { useState } from "react";

import TaskHeader from "./components/TaskHeader.js";
import { TasksProvider, useTasksStore } from "./stores/tasks/TasksContext.js";
import TaskList from "./components/TaskList.js";
import { TaskModalProvider } from "./stores/taskModal/TaskModalContext.js";
import TaskModal from "./components/TaskModal.js";

function App() {
  const { dispatch, actions, numberOfCompleted } = useTasksStore();

  const [isShow, setShow] = useState(false);

  const onToggleHeader = () => {
    setShow(!isShow);
  };

  const onClearHeader = () => {
    if (confirm("Удалить все завершенные?")) {
      dispatch(actions.deleteCompletedOnes());
    }
  };

  return (
    <>
      <TasksProvider>
        <TaskModalProvider>
          <TaskHeader
            title="Все"
            numberOfCompleted={numberOfCompleted}
            isShow={isShow}
            onToggle={onToggleHeader}
            onClear={onClearHeader}
          />
          <TaskList isShow={isShow} />
          <TaskModal />
        </TaskModalProvider>
      </TasksProvider>
    </>
  );
}

export default App;
