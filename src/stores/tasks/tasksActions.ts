import type { TaskAction, TaskEntity } from "../../types";

const tasksActions = {
  create(task: TaskEntity): TaskAction {
    return { type: "create-one", value: task };
  },
  update(task: TaskEntity): TaskAction {
    return { type: "update-one", value: task };
  },
  delete(task: TaskEntity): TaskAction {
    return { type: "delete-one", value: task };
  },
  deleteCompletedOnes(): TaskAction {
    return { type: "delete-completed-ones" };
  },
};

export default tasksActions;
