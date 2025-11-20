type Props = {
  title: string;
  isShow: boolean;
  numberOfCompleted: number;
  onToggle(): void;
  onClear(): void;
};

export default function TaskHeader({
  title,
  isShow,
  numberOfCompleted,
  onToggle,
  onClear,
}: Props) {
  return (
    <>
      <header style={{ marginBottom: "1rem" }}>
        <h1>{title}</h1>
        <div>
          <span>{numberOfCompleted} завершены</span>•
          <button type="button" onClick={onClear}>
            Очистить
          </button>
          <button type="button" onClick={onToggle}>
            {isShow ? "Скрыть" : "Показать"}
          </button>
        </div>
      </header>
    </>
  );
}
