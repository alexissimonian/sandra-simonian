import { AppError } from "$lib/errors/errorHandler";

export function assertType<T>(value: T | null | undefined): T {
  if (!value) {
    throw new AppError("Une erreur est survenue dans la récupération d'un champ obligatoire.", { redirectToErrorPage: true });
  }

  return value;
}
