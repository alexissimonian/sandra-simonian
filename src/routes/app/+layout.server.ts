import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types'
import { validateDateRange } from '$lib/utils';

export const load: LayoutServerLoad = async ({ locals, cookies, url }) => {
  const profile = locals.profile;

  if (profile.validTo && !validateDateRange(new Date(), undefined, new Date(profile.validTo))) {
    throw redirect(303, "/logout");
  }

  if (url.searchParams.get("source") === "login" && profile.role === "admin") {
    throw redirect(303, "/admin");
  }

  return {
    profile,
    cookies: cookies.getAll(),
  }
}
