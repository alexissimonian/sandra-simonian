import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async ({ locals, url, cookies }) => {
  const profile = locals.profile;

  const publicRoutes = ["/login", "/logout"];
  const isPublicRoute = publicRoutes.includes(url.pathname);

  return {
    profile,
    isPublicRoute,
    cookies: cookies.getAll(),
  }
}
