import { redirect } from '@sveltejs/kit'
import type { LayoutServerLoad } from './$types'
import { getUserProfile } from '$lib/server/services/user/userRequest';
import type { Profile } from '$lib/types';
import { handleError } from '$lib/errors/errorHandler';

export const load: LayoutServerLoad = async ({ locals, cookies, url }) => {
  const { session, user } = await locals.safeGetSession();

  // Redirect to login if not authenticated
  if (!session || !user) {
    throw redirect(303, '/login')
  }

  // Load profile
  let profile: Profile | undefined = undefined;
  try {
    profile = await getUserProfile(locals.supabase);
  } catch (error) {
    handleError(error);
  }

  // If admin from login go to admin
  const source = url.searchParams.get("source");
  if (profile?.role === "admin" && source === "login") {
    redirect(303, "/admin")
  }

  return {
    session,
    user,
    profile,
    cookies: cookies.getAll(),
  }
}
