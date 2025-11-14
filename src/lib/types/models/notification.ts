export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface Notification {
  id: number;
  type: NotificationType;
  message: string;
}

export interface NotificationInput {
  type: NotificationType;
  message: string;
}
