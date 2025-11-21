import { useTasksStore } from "../stores/tasks/TasksContext.js";
import { useTaskModalStore } from "../stores/taskModal/TaskModalContext.js";
import { createTask } from "../tools/helpers.js";
import TaskForm from "./TaskForm.js";
import type { TaskEntity } from "../types.js";
import { useTasksGetters } from "../hooks/useTasksGetters.js";

type Props = {
  isShow: boolean;
};

export default function TaskList({ isShow }: Props) {
  const { updateOne, createOne, deleteOne } = useTasksStore();
  const { sorted, uncompleted } = useTasksGetters();
  const { show } = useTaskModalStore();

  const name = "Задачи";

  const onTaskChange = (task: TaskEntity): void => {
    updateOne(task);
  };

  const onTaskNew = (): void => {
    const task = createTask();
    createOne(task);
  };

  const onTaskBlur = (task: TaskEntity): void => {
    if (!task.title) deleteOne(task);
  };

  const onTaskDelete = (task: TaskEntity): void => {
    deleteOne(task);
  };

  const onTaskModal = (task: TaskEntity): void => {
    show(task);
  };

  return (
    <div>
      <h2>{name}</h2>
      <ul>
        {(isShow ? sorted : uncompleted).map((task) => (
          <li key={task.id}>
            <TaskForm
              task={task}
              onChange={onTaskChange}
              onSubmit={onTaskNew}
              onBlur={onTaskBlur}
            />
            <button type="button" onClick={() => onTaskDelete(task)}>
              Удалить
            </button>
            <button type="button" onClick={() => onTaskModal(task)}>
              Подробнее
            </button>
          </li>
        ))}
        <li>
          <button type="button" onClick={onTaskNew} tabIndex={1}>
            Создать
          </button>
        </li>
      </ul>
    </div>
  );
}
