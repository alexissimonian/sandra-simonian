import { goto } from '$app/navigation';
import { addNotification } from '$lib/stores/notifications';
import type { AppErrorOptions } from '$lib/types';

export class AppError extends Error {
  showNotification: boolean;
  redirectToErrorPage: boolean;
  statusCode: number;

  constructor(message: string, options: AppErrorOptions = {}) {
    super(message);
    this.name = 'AppError';
    this.showNotification = options.showNotification ?? false;
    this.redirectToErrorPage = options.redirectToErrorPage ?? true;
    this.statusCode = options.statusCode ?? 500;
  }
}

export function handleError(error: unknown): void {
  if (error instanceof AppError) {
    if (error.showNotification) {
      addNotification({
        type: 'error',
        message: error.message
      });
      return;
    }

    if (error.redirectToErrorPage) {
      goto(`/error?message=${encodeURIComponent(error.message)}`);
      return;
    }
  }

  // Default: redirect to error page
  const message = error instanceof Error ? error.message : 'An unexpected error occurred';
  goto(`/error?message=${encodeURIComponent(message)}`);
}
