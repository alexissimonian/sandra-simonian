export function validateNameField(name: string): boolean {
  return name.length < 2 ? false : true;
}

export function validateEmailField(email: string): boolean {
  const emailRegex = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim;
  return emailRegex.test(email);
}

export function validateDateRange(compareDate: Date, minDate?: Date, maxDate?: Date): boolean {
  let result = true;
  if (minDate) {
    result = compareDate.getTime() >= minDate.getTime();
  }

  if (maxDate) {
    result = compareDate.getTime() < maxDate.getTime();
  }

  return result;
}

export function getComparableTodayDate(): Date {
  let result = new Date();
  result.setHours(0, 0, 0, 0);
  return result;
}

export async function sendFormData(path: string, formData: FormData): Promise<Response> {
  const response = await fetch(path, {
    method: "POST",
    body: formData,
  });

  return response;
}

