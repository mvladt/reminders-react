import { useTasksStore } from "../stores/tasks/TasksContext.jsx";
import { useTaskModalStore } from "../stores/taskModal/TaskModalContext.jsx";
import { createTask } from "../tools/helpers.js";
import TaskForm from "./TaskForm.jsx";

export default function TaskList({ isShow = false }) {
  const { dispatch, actions, tasks, uncompleted } = useTasksStore();
  const { show } = useTaskModalStore();

  const name = "Задачи";

  const onTaskChange = (task) => {
    dispatch(actions.update(task));
  };

  const onTaskNew = () => {
    const task = createTask();
    dispatch(actions.create(task));
  };

  const onTaskBlur = (task) => {
    if (!task.title) dispatch(actions.delete(task));
  };

  const onTaskDelete = (task) => {
    dispatch(actions.delete(task));
  };

  const onTaskModal = (task) => {
    show(task);
  };

  return (
    <div>
      <h2>{name}</h2>
      <ul>
        {(isShow ? tasks : uncompleted).map((task) => (
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
