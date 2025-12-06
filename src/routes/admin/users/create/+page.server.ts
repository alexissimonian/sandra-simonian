import { isHttpError, type Actions } from "@sveltejs/kit";
import { validateEmailField, validateNameField } from "$lib/utils";
import { createUserProfile } from "$lib/server/services/adminUser/adminUserCommand";
import { error } from "@sveltejs/kit";

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
      try {
        await createUserProfile(email.toLocaleLowerCase(), lastname.toLocaleLowerCase(), firstname.toLocaleLowerCase());
      } catch (profileError) {
        console.error(profileError);
        if (isHttpError(profileError)) {
          throw error(profileError.status, "Un problème est survenu lors de la création de l'utilisateur.");
        }
      }
    } else {
      throw error(400, "Echec lors de la validation de l'utilisateur.");
    }
  }
}
