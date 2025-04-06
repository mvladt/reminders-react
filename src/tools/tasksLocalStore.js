export const getStateFromLocal = () => {
  return JSON.parse(localStorage.getItem("tasks")) || [];
};

export const saveStateToLocal = (state) => {
  localStorage.setItem("tasks", JSON.stringify(state));
};
