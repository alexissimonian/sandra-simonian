export function validateNameField(name: string): boolean {
  return name.length < 2 ? false : true;
}

export function validateEmailField(email: string): boolean {
  const emailRegex = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim;
  return emailRegex.test(email);
}

export async function sendFormData(path: string, formData: FormData): Promise<Response> {
  const response = await fetch(path, {
    method: "POST",
    body: formData,
  });

  if (response.ok) {
    console.log(response);
  }

  return response;
}
