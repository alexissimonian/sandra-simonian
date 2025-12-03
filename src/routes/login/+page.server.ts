import { fail, redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

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

    const { error } = await locals.supabase.auth.signInWithOtp({
      email
    });

    if (error) {
      return fail(400, { error: "Impossible de trouver cet email" });
    }

    return { success: true };
  },
  code: async ({ request, locals }) => {
    const formData = await request.formData();
    const code = formData.get("code") as string;
    const email = formData.get("email") as string;

    const { data, error } = await locals.supabase.auth.verifyOtp({
      email,
      token: code,
      type: "email"
    });

    if (error || !data.user?.email) {
      console.log("eroro here")
      return fail(400, { error: "Oops, nous n\'avons pas pu vérifier votre code ! Réessayez." })

    }

    return { connected: true };
  }
} 
