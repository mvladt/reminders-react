import { useState } from "react";

import { useTasksStore } from "../stores/tasks/TasksContext";
import TaskHeader from "./TaskHeader";
import TaskList from "./TaskList";
import TaskModal from "./TaskModal";
import { useTasksGetters } from "../hooks/useTasksGetters";

function TaskWrapper() {
  const { deleteCompletedOnes } = useTasksStore();
  const { numberOfCompleted } = useTasksGetters();

  const [isShow, setShow] = useState(false);

  const onToggleHeader = () => {
    setShow(!isShow);
  };

  const onClearHeader = () => {
    if (confirm("Удалить все завершенные?")) {
      deleteCompletedOnes();
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
