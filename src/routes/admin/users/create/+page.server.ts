import { isHttpError, type Actions } from "@sveltejs/kit";
import { getComparableTodayDate, validateDateRange, validateEmailField, validateNameField } from "$lib/utils";
import { createUserProfile } from "$lib/server/services/adminUser/adminUserCommand";
import { error } from "@sveltejs/kit";

export const actions: Actions = {
  create: async ({ request }) => {
    const data = await request.formData();
    const lastname = data.get("lastname") as string;
    const firstname = data.get("firstname") as string;
    const email = data.get("email") as string;
    const validFromDateString = data.get("validFromDate") as string;
    const validToDateString = data.get("validToDate") as string;
    let validFromDate: Date | undefined;
    let validToDate: Date | undefined;
    let isValidFromDateInRange = true;
    let isValidToDateInRange = true;

    if (validFromDateString) {
      validFromDate = new Date(validFromDateString);
      isValidFromDateInRange = validateDateRange(validFromDate, getComparableTodayDate())
    }

    if (validToDateString) {
      validToDate = new Date(validToDateString);
      isValidToDateInRange = isValidFromDateInRange && (validateDateRange(validToDate, validFromDate))
    }

    const isLastnameValidated = validateNameField(lastname);
    const isFirstnameValidated = validateNameField(firstname);
    const isEmailValidated = validateEmailField(email);

    if (isLastnameValidated && isFirstnameValidated && isEmailValidated && isValidFromDateInRange && isValidToDateInRange) {
      try {
        await createUserProfile(email.toLocaleLowerCase(), lastname.toLocaleLowerCase(), firstname.toLocaleLowerCase(), validFromDate, validToDate);
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
