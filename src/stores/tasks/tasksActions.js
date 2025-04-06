export const TYPE_CREATE = "create";
export const TYPE_UPDATE = "update-one";
export const TYPE_DELETE = "delete-one";
export const TYPE_DELETE_COMPLETED_ONES = "delete-completed-ones";

const tasksActions = {
  create(task) {
    return { type: TYPE_CREATE, value: task };
  },
  update(task) {
    return { type: TYPE_UPDATE, value: task };
  },
  delete(task) {
    return { type: TYPE_DELETE, value: task };
  },
  deleteCompletedOnes() {
    return { type: TYPE_DELETE_COMPLETED_ONES };
  },
};

export default tasksActions;
