import { fail, redirect, type Actions } from "@sveltejs/kit";
import { validateEmailField, validateNameField } from "$lib/utils";
import { createUserProfile } from "$lib/server/services/adminUser/adminUserCommand";

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
        const newProfile = await createUserProfile(email.toLocaleLowerCase(), lastname.toLocaleLowerCase(), firstname.toLocaleLowerCase());
        if (newProfile) {
          redirect(303, "/admin/users");
        }
      } catch (error) {
        fail(500, { error: "Un problème est survenu lors de la création de l'utilisateur." })
      }
    }

    return fail(400, { error: "Echec lors de la validation de l'utilisateur.", firstname, lastname, email });
  }
}
