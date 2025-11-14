import { redirect } from '@sveltejs/kit'
import type { LayoutServerLoad } from './$types'
import { getUserProfile } from '$lib/server/services/user/userRequest';
import { generateProfile } from '$lib/types';

export const load: LayoutServerLoad = async ({ locals, cookies }) => {
  const { session, user } = await locals.safeGetSession();

  // Redirect to login if not authenticated
  if (!session || !user) {
    throw redirect(303, '/login')
  }

  // Load profile
  const profileRow = await getUserProfile(locals.supabase);
  const profile = generateProfile(profileRow, user);

  if (profile.role != "admin") {
    throw redirect(303, '/app')
  }

  return {
    session,
    user,
    profile,
    cookies: cookies.getAll(),
  }
}
