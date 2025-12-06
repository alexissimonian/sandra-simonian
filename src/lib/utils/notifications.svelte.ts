export const notificationHelper = $state<any>({});

export function notify(severity: "info" | "danger" | "warning" | "success", message: string): void {
  notificationHelper.showNotice({
    type: severity,
    expire: 6000,
    text: message
  })
}
