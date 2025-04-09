export const createTask = (title = "", text = "") => {
  return { id: createId(), title, text, completed: false, date: "" };
};

export function createId() {
  return `id-${Date.now().toString(16)}-${Math.random().toString(16).slice(2)}`;
}

const sleep = async (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const scheduleNotification = async (task) => {
  await sleep(1000);
  console.log("scheduleNotification: ", `on task ${task.id}, scheduled.`);
};

export const cancelNotification = async (task) => {
  await sleep(1000);
  console.log("cancelNotification: ", `on task ${task.id}, canceled.`);
};
