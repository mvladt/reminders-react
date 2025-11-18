import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
  type RefObject,
  type Dispatch,
  type SetStateAction,
} from "react";
import { createTask } from "../../tools/helpers";
import type { TaskEntity } from "../../types";

type ProvidedValue = {
  setModalRef(modalRef: RefObject<HTMLDialogElement>): void;
  show(task: TaskEntity): void;
  close(): void;
  task: TaskEntity;
  setTask: Dispatch<SetStateAction<TaskEntity>>;
};

const TaskModalContext = createContext<ProvidedValue>({});

/**
 * Этот стор хранит ссылку на <dialog>, задачку, которую надо отобразить,
 * и методы dialog "show" и "close".
 */
export function TaskModalProvider({ children }: PropsWithChildren) {
  let modalRef: RefObject<HTMLDialogElement>;

  const [task, setTask] = useState<TaskEntity>(createTask());

  const setModalRef = (ref: RefObject<HTMLDialogElement>) => {
    modalRef = ref;
  };

  const show = (task: TaskEntity): void => {
    if (!modalRef) throw new Error("TaskModal: 'modalRef' not set.");

    setTask(task);
    modalRef.current.showModal();
  };

  const close = (): void => {
    if (!modalRef) throw new Error("TaskModal: 'modalRef' not set.");

    setTask(createTask());
    modalRef.current.close();
  };

  const providedValue: ProvidedValue = {
    setModalRef,
    show,
    close,
    task,
    setTask,
  };

  return (
    <TaskModalContext.Provider value={providedValue}>
      {children}
    </TaskModalContext.Provider>
  );
}

export function useTaskModalStore() {
  return useContext(TaskModalContext);
}
