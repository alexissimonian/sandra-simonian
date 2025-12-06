export const notificationHelper = $state<any>({});

export function notify(severity: "info" | "danger" | "warning" | "success", message: string): void {
  notificationHelper.showNotice({
    type: severity,
    expire: 6000,
    text: message
  })
}

export async function verify(title: string, message: string): Promise<boolean> {
  try {
    await notificationHelper.showModal({
      title: title,
      message: message
    })
    return true;
  } catch (error) {
    return false;
  }
}
