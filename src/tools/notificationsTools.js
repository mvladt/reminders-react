import { sleep } from "./helpers.js";

export const setupNotification = async (previousTask, updatedTask) => {
  const isDateChanged = updatedTask.date !== previousTask.date;
  const isPreviousNotificationScheduled = previousTask.date;

  if (!window.isSecureContext) {
    return alert("Ошибка: Notification API available only in secure contexts.");
  }

  if (isPreviousNotificationScheduled) {
    await cancelNotification({ payload: updatedTask });
  }

  await setupNotificationPermission();

  if (
    updatedTask.date &&
    isDateChanged &&
    window?.Notification?.permission === "granted"
  ) {
    const subscription = null; // TODO: Добавить функцию получения подписи.
    await scheduleNotification({ payload: updatedTask, subscription });
  }
};

export const setupNotificationPermission = async () => {
  if (!window.Notification) {
    alert(
      "Похоже уведомления недоступны. Попробуйте добавить сайт на экран «Домой»."
    );
  }

  if (window?.Notification?.permission !== "granted") {
    await Notification.requestPermission();
  }
};

export const scheduleNotification = async (task) => {
  await sleep(1000);
  console.log("scheduleNotification: ", `on task ${task.id}, scheduled.`);
};

export const cancelNotification = async (task) => {
  await sleep(1000);
  console.log("cancelNotification: ", `on task ${task.id}, canceled.`);
};
