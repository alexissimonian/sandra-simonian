import { redirect } from '@sveltejs/kit'
import { env } from '$env/dynamic/private'
import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async ({ locals: { safeGetSession }, cookies }) => {
  const { session, user } = await safeGetSession();

  // Redirect to login if not authenticated
  if (!session || !user) {
    throw redirect(303, '/login')
  }

  // Check if user is admin
  const adminEmails = env.SECRET_ADMIN_EMAILS.split(',')
  if (!user.email || !adminEmails.includes(user.email)) {
    throw redirect(303, '/app')
  }

  return {
    session,
    user,
    cookies: cookies.getAll(),
  }
}
