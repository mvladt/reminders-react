export const createTask = (title = "", text = "") => {
  return { id: createId(), title, text, completed: false, date: "" };
};

export function createId() {
  return `id-${Date.now().toString(16)}-${Math.random().toString(16).slice(2)}`;
}
