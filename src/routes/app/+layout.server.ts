import { redirect } from '@sveltejs/kit'
import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async ({ locals: { safeGetSession }, cookies }) => {
  const { session, user } = await safeGetSession();

  // Redirect to login if not authenticated
  if (!session || !user) {
    throw redirect(303, '/login')
  }

  return {
    session,
    user,
    cookies: cookies.getAll(),
  }
}
