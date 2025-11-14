export const createTask = (title = "", text = "") => {
  return { id: dumbUUID(), title, text, completed: false, datetime: "" };
};

export const dumbUUID = () => {
  return `id-${Date.now().toString(16)}-${Math.random().toString(16).slice(2)}`;
};

export const sleep = async (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
