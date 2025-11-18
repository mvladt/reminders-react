import {
  useEffect,
  useRef,
  type FocusEvent,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import type { TaskEntity } from "../types";

type Props = {
  task: Partial<TaskEntity>;
  onChange(task: Partial<TaskEntity>): void;
  onSubmit(event: FormEvent): void;
  onBlur(task: Partial<TaskEntity>): void;
};

export default function TaskForm({
  task = {},
  onChange,
  onSubmit,
  onBlur,
}: Props) {
  const checkboxRef = useRef<HTMLInputElement | null>(null);
  const textinputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!task.title) textinputRef.current.focus();
  }, []);

  const onFormSubmit = (event: FormEvent): void => {
    event.preventDefault();
    onSubmit(event);
  };

  const onFormBlur = (event: FocusEvent): void => {
    const isOutOfForm = !(
      event.relatedTarget === textinputRef.current ||
      event.relatedTarget === checkboxRef.current
    );
    if (isOutOfForm) onBlur(task);
  };

  const onKeyDownEsc = (event: KeyboardEvent<HTMLFormElement>): void => {
    event.currentTarget.blur();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLFormElement>): void => {
    const isEsc = event.code === "Escape";
    if (isEsc) onKeyDownEsc(event);
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
        onChange={(event) =>
          onChange({ ...task, completed: event.target.checked })
        }
      />
      <input
        id={`title-${task.title}`}
        type="text"
        ref={textinputRef}
        value={task.title}
        onChange={(event) => onChange({ ...task, title: event.target.value })}
      />
    </form>
  );
}
