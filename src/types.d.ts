export type TaskEntity = {
  id: string;
  title: string;
  text: string;
  completed: boolean;
  datetime: string;
};

export type TaskAction =
  | {
      type: "create-one";
      value: TaskEntity;
    }
  | { type: "update-one"; value: TaskEntity }
  | { type: "delete-one"; value: TaskEntity }
  | { type: "delete-completed-ones" };
