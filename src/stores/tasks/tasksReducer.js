import {
  TYPE_CREATE,
  TYPE_UPDATE,
  TYPE_DELETE,
  TYPE_DELETE_COMPLETED_ONES,
} from "./tasksActions.js";

const tasksReducer = (tasks, action) => {
  switch (action.type) {
    case TYPE_CREATE: {
      const creating = action.value;
      return [...tasks, creating];
    }
    case TYPE_UPDATE: {
      const updating = action.value;
      return tasks.map((t) => {
        if (t.id === updating.id) return { ...t, ...updating };
        return t;
      });
    }
    case TYPE_DELETE: {
      const deleting = action.value;
      return tasks.filter((t) => {
        if (t.id === deleting.id) return false;
        return true;
      });
    }
    case TYPE_DELETE_COMPLETED_ONES: {
      return tasks.filter((t) => {
        if (t.completed) return false;
        return true;
      });
    }
    default:
      throw new Error("Unknown action: " + action.type);
  }
};

export default tasksReducer;
