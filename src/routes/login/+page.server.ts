import { redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { error } from "@sveltejs/kit";
import { validateEmailField } from "$lib/utils";
import { getValidDatesForEmail } from "$lib/server/services/adminUser/adminUserRequest";
import { validateDateRange } from "$lib/utils";

export const load: PageServerLoad = async ({ locals }) => {
  const profile = locals.profile;

  // Redirect to app if already authenticated
  if (profile) {
    throw redirect(303, '/app');
  }

  return {};
};

export const actions: Actions = {
  login: async ({ request, locals }) => {
    const data = await request.formData();
    const email = data.get("email") as string;

    if (!validateEmailField(email)) {
      throw error(400, "Veuillez entrer un email valide.");
    }

    const { validFromString, validToString, error: validDateError } = await getValidDatesForEmail(email);

    if (validDateError) {
      console.error(validDateError);
      throw error(400, "Impossible de trouver cet email");
    }

    if (validFromString) {
      if (!validateDateRange(new Date(), new Date(validFromString))) throw error(401, "Ce profil n'est pas encore valide.");
    }

    if (validToString) {
      if (!validateDateRange(new Date(), undefined, new Date(validToString))) throw error(401, "Ce profil n'est plus valide.");
    }

    const { error: emailError } = await locals.supabase.auth.signInWithOtp({
      email
    });

    if (emailError) {
      throw error(400, "Impossible de trouver cet email");
    }

    return { success: true };
  },
  code: async ({ request, locals }) => {
    const formData = await request.formData();
    const code = formData.get("code") as string;
    const email = formData.get("email") as string;

    if (!validateCodeField(code)) {
      throw error(400, "Le code est composé de 8 digits.");
    }

    const { data, error: codeError } = await locals.supabase.auth.verifyOtp({
      email,
      token: code,
      type: "email"
    });

    if (codeError || !data.user?.email) {
      throw error(400, "Oops, nous n\'avons pas pu vérifier votre code ! Réessayez.")
    }

    return { connected: true };
  }
}

function validateCodeField(code: string): boolean {
  const regex = /\d{8}/;
  return regex.test(code);
}
