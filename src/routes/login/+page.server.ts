import { fail, redirect, type Actions } from "@sveltejs/kit";

export const actions: Actions = {
  login: async ({ request, locals }) => {
    const data = await request.formData();
    const email = data.get("email") as string;

    const { error } = await locals.supabase.auth.signInWithOtp({
      email
    });


    if (error) {
      return fail(400, { error: error.code });
    }

    return { success: true, email: email, step: "code" };
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

    if (error) {
      return fail(400, { error: error.code, step: "code", email, code })
    }

    if (data.user?.email === "alexis.simonian@proton.me") {
      throw redirect(303, "/admin")
    }

    throw redirect(303, "/app");

  }
} 
