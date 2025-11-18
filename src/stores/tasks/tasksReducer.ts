import type { TaskAction, TaskEntity } from "../../types.js";

const tasksReducer = (tasks: TaskEntity[], action: TaskAction) => {
  switch (action.type) {
    case "create-one": {
      const creating = action.value;
      return [...tasks, creating];
    }
    case "update-one": {
      const updating = action.value;
      return tasks.map((t) => {
        if (t.id === updating.id) return { ...t, ...updating };
        return t;
      });
    }
    case "delete-one": {
      const deleting = action.value;
      return tasks.filter((t) => {
        if (t.id === deleting.id) return false;
        return true;
      });
    }
    case "delete-completed-ones": {
      return tasks.filter((t) => {
        if (t.completed) return false;
        return true;
      });
    }
    default:
      throw new Error("Unknown action: " + JSON.stringify(action));
  }
};

export default tasksReducer;
