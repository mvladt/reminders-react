export default function TaskModalForm({
  task = {},
  onChange = (f) => f,
  onSubmit = (f) => f,
  onClose = (f) => f,
}) {
  return (
    <form onSubmit={onSubmit}>
      <div>
        <input
          type="text"
          id={`title-${task.id}`}
          value={task.title}
          onChange={(e) => onChange({ ...task, title: e.target.value })}
          placeholder="Задача..."
        />
      </div>
      <div>
        <textarea
          id={`text-${task.id}`}
          value={task.text}
          onChange={(e) => onChange({ ...task, text: e.target.value })}
          placeholder="Заметки по задаче..."
        />
      </div>
      <div>
        <input
          type="datetime-local"
          id={`datetime-${task.id}`}
          value={task.datetime}
          onChange={(e) => onChange({ ...task, datetime: e.target.value })}
        />
      </div>
      <div>
        <button type="submit">Сохранить</button>
        <button type="button" onClick={onClose}>
          Назад
        </button>
      </div>
    </form>
  );
}
