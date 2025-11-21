import { useRef, type FormEvent, type RefObject } from "react";

import { useTasksStore } from "../stores/tasks/TasksContext.js";
import { useTaskModalStore } from "../stores/taskModal/TaskModalContext.js";
import TaskModalForm from "./TaskModalForm.js";
import type { TaskEntity } from "../types.js";

export default function TaskModal() {
  const { updateOne } = useTasksStore();
  const { setModalRef, setTask, task, close } = useTaskModalStore();

  const dialogRef = useRef<HTMLDialogElement | null>(null);

  setModalRef(dialogRef);

  const onChange = (updating: Partial<TaskEntity>) => {
    setTask({ ...task, ...updating });
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    updateOne(task);
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
