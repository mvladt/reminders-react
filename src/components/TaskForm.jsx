import { useEffect, useRef } from "react";

export default function TaskForm({
  task = {},
  onChange = (f) => f,
  onSubmit = (f) => f,
  onBlur = (f) => f,
}) {
  const checkboxRef = useRef();
  const textinputRef = useRef();

  useEffect(() => {
    if (!task.title) textinputRef.current.focus();
  }, []);

  const onFormSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  const onFormBlur = (e) => {
    const isOutOfForm = !(
      e.relatedTarget === textinputRef.current ||
      e.relatedTarget === checkboxRef.current
    );
    if (isOutOfForm) onBlur(task);
  };

  const onKeyDownEsc = (e) => {
    e.target.blur();
  };

  const onKeyDown = (e) => {
    const isEsc = e.code === "Escape";
    if (isEsc) onKeyDownEsc(e);
  };

  return (
    <form
      onSubmit={onFormSubmit}
      onKeyDown={onKeyDown}
      onBlur={onFormBlur}
      style={{ display: "inline" }}
    >
      <input
        id={`completed-${task.id}`}
        type="checkbox"
        ref={checkboxRef}
        checked={task.completed}
        onChange={(e) => onChange({ ...task, completed: e.target.checked })}
      />
      <input
        id={`title-${task.title}`}
        type="text"
        ref={textinputRef}
        value={task.title}
        onChange={(e) => onChange({ ...task, title: e.target.value })}
      />
    </form>
  );
}
