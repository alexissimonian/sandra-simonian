import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async ({ locals, url }) => {
  const profile = locals.profile;

  if (url.searchParams.get("source") === "login" && profile.role === "admin") {
    throw redirect(303, "/admin");
  }
}
