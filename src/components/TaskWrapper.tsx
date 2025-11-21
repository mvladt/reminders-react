import { useState } from "react";

import { useTasksStore } from "../stores/tasks/TasksContext";
import TaskHeader from "./TaskHeader";
import TaskList from "./TaskList";
import TaskModal from "./TaskModal";

function TaskWrapper() {
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
    <div>
      <TaskHeader
        title="Все"
        numberOfCompleted={numberOfCompleted}
        isShow={isShow}
        onToggle={onToggleHeader}
        onClear={onClearHeader}
      />
      <TaskList isShow={isShow} />
      <TaskModal />
    </div>
  );
}

export default TaskWrapper;
