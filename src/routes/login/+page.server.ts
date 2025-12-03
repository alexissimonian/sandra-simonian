import { fail, redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { error } from "@sveltejs/kit";

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
