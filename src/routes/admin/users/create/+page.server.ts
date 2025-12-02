import { fail, type Actions } from "@sveltejs/kit";
import { validateEmailField, validateNameField } from "$lib/utils";

export const actions: Actions = {
  create: async ({ request }) => {
    const data = await request.formData();
    const lastname = data.get("lastname") as string;
    const firstname = data.get("firstname") as string;
    const email = data.get("email") as string;

    const isLastnameValidated = validateNameField(lastname);
    const isFirstnameValidated = validateNameField(firstname);
    const isEmailValidated = validateEmailField(email);

    if (isLastnameValidated && isFirstnameValidated && isEmailValidated) {

    }

    return fail(400, { error: "Echec lors de la validation de l'utilisateur.", firstname, lastname, email });
  }
}
