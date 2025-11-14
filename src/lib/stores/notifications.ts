import { writable } from "svelte/store";
import type { Notification, NotificationInput } from "$lib/types";

export const notifications = writable<Notification[]>([]);

export function addNotification(input: NotificationInput): void {
  const id = Date.now();
  const notification: Notification = { ...input, id };

  notifications.update(n => [...n, notification]);

  // Auto-remove after 5 seconds
  setTimeout(() => {
    removeNotification(id);
  }, 5000);
}

export function removeNotification(id: number): void {
  notifications.update(n => n.filter(notification => notification.id !== id));
}
