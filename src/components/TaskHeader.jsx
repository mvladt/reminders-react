import { useTasksStore } from "../stores/tasks/TasksContext.jsx";

export default function TaskHeader({ isShow = false, showToggle = (f) => f }) {
  const title = "Все";
  const { dispatch, actions, numberOfCompleted } = useTasksStore();

  const onClear = () => {
    if (confirm("Удалить все завершенные?")) {
      dispatch(actions.deleteCompletedOnes());
    }
  };

  const onShowToggle = () => {
    showToggle();
  };

  return (
    <>
      <h1>{title}</h1>
      <div>
        <span>{numberOfCompleted} завешрены</span>•
        <button type="button" onClick={onClear}>
          Очистить
        </button>
        <button type="button" onClick={onShowToggle}>
          {isShow ? "Скрыть" : "Показать"}
        </button>
      </div>
    </>
  );
}
