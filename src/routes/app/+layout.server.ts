import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async ({ locals, cookies }) => {
  const profile = locals.profile;

  return {
    profile,
    cookies: cookies.getAll(),
  }
}
