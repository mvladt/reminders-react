import { createContext, useContext, useState } from "react";
import { createTask } from "../../tools/helpers.js";

const TaskModalContext = createContext();

/**
 * Этот стор хранит ссылку на <dialog>, задачку, которую надо отобразить,
 * и методы dialog "show" и "close".
 */
export function TaskModalProvider({ children }) {
  /** @type {import('react').RefObject<HTMLDialogElement>} */
  let modalRef;

  const [task, setTask] = useState(createTask());

  const setModalRef = (ref) => {
    modalRef = ref;
  };

  const show = (task) => {
    if (!modalRef) throw new Error("TaskModal: 'modalRef' not set.");

    setTask(task);
    modalRef.current.showModal();
  };

  const close = () => {
    if (!modalRef) throw new Error("TaskModal: 'modalRef' not set.");

    setTask(createTask());
    modalRef.current.close();
  };

  const toProvide = {
    setModalRef,
    show,
    close,
    task,
    setTask,
  };

  return (
    <TaskModalContext.Provider value={toProvide}>
      {children}
    </TaskModalContext.Provider>
  );
}

export function useTaskModalStore() {
  return useContext(TaskModalContext);
}
