import { useTasksStore } from "../stores/tasks/TasksContext.js";

type Props = {
  isShow: boolean;
  showToggle(): void;
};

export default function TaskHeader({ isShow, showToggle }: Props) {
  const title = "Все";
  const { dispatch, actions, numberOfCompleted } = useTasksStore();

  const onClear = (): void => {
    if (confirm("Удалить все завершенные?")) {
      dispatch(actions.deleteCompletedOnes());
    }
  };

  const onShowToggle = (): void => {
    showToggle();
  };

  return (
    <>
      <h1>{title}</h1>
      <div>
        <span>{numberOfCompleted} завершены</span>•
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
