import { useRef } from "react";

import { useTasksStore } from "../stores/tasks/TasksContext.jsx";
import { useTaskModalStore } from "../stores/taskModal/TaskModalContext.jsx";
import TaskModalForm from "./TaskModalForm.jsx";
import {
  cancelNotification,
  scheduleNotification,
} from "../tools/tasksTools.js";

export default function TaskModal() {
  const { dispatch, actions, tasks } = useTasksStore();
  const { setModalRef, setTask, task, close } = useTaskModalStore();

  const dialogRef = useRef();

  setModalRef(dialogRef);

  const onChange = (updating) => {
    setTask({ ...task, ...updating });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const oldTask = tasks.find((t) => t.id === task.id);
    const isDateChanged = task.date !== oldTask.date;
    if (isDateChanged) {
      if (oldTask.date) await cancelNotification(task);
      if (task.date) await scheduleNotification(task);
    }

    dispatch(actions.update(task));
    close();
  };

  return (
    <dialog ref={dialogRef}>
      <h3>Подробнее</h3>
      <TaskModalForm
        task={task}
        onChange={onChange}
        onSubmit={onSubmit}
        onClose={close}
      />
    </dialog>
  );
}
