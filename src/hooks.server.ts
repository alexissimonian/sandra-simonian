import { env as publicEnv } from '$env/dynamic/public'
import { createServerClient, isBrowser } from '@supabase/ssr'
import type { Handle } from '@sveltejs/kit'
import { error, redirect } from '@sveltejs/kit'
import type { Profile } from '$lib/types'
import { getUserProfile } from '$lib/server/services/user/userRequest'
import { validateDateRange } from '$lib/utils'
import { checkinUser } from '$lib/server/services/adminUser/adminUserCommand'

export const handle: Handle = async ({ event, resolve }) => {
  event.locals.supabase = createServerClient(publicEnv.PUBLIC_SUPABASE_URL, publicEnv.PUBLIC_SUPABASE_PUBLISHABLE_KEY, {
    cookies: {
      getAll() {
        return event.cookies.getAll()
      },
      setAll(cookiesToSet) {
        /**
         * Note: You have to add the `path` variable to the
         * set and remove method due to sveltekit's cookie API
         * requiring this to be set, setting the path to an empty string
         * will replicate previous/standard behavior (https://kit.svelte.dev/docs/types#public-types-cookies)
         */
        cookiesToSet.forEach(({ name, value, options }) =>
          event.cookies.set(name, value, { ...options, path: '/' })
        )
      },
    },
  })

  /**
   * Unlike `supabase.auth.getSession()`, which returns the session _without_
   * validating the JWT, this function also calls `getUser()` to validate the
   * JWT before returning the session.
   */
  event.locals.safeGetSession = async () => {
    const {
      data: { session },
    } = await event.locals.supabase.auth.getSession()
    if (!session) {
      return { session: null, user: null }
    }

    const {
      data: { user },
      error,
    } = await event.locals.supabase.auth.getUser()
    if (error) {
      // JWT validation has failed
      return { session: null, user: null }
    }

    return { session, user }
  }

  const publicRoutes = ["/login", "/logout"];
  const isRouteProtected = !publicRoutes.includes(event.url.pathname);
  const { user } = await event.locals.safeGetSession();

  if (isRouteProtected && !user) {
    if (event.request.method !== "GET") {
      return new Response(JSON.stringify({ error: "unauthorized" }), { status: 401, headers: { "Content-Type": "application/json" } });
    }
    throw redirect(303, "/login");
  }

  let profile: Profile | undefined = undefined;
  if (user) {
    try {
      profile = await getUserProfile(event.locals.supabase);
      event.locals.profile = profile;
    } catch (profileError) {
      console.error(profileError);
      throw error(500, "Nous n'avons pas pu récupérer le profil.");
    }
  }

  if (isRouteProtected && profile?.validFrom) {
    const validFromDate = new Date(profile?.validFrom);
    if (!validateDateRange(new Date(), validFromDate)) {
      if (event.request.method !== "GET" || !isBrowser()) {
        return new Response(JSON.stringify({ error: "unauthorized" }), { status: 401, headers: { "Content-Type": "application/json" } });
      }
      throw redirect(303, "/logout");
    }
  }

  if (isRouteProtected && profile?.validTo) {
    const validToDate = new Date(profile?.validTo);
    if (!validateDateRange(new Date(), undefined, validToDate)) {
      if (event.request.method !== "GET" || !isBrowser()) {
        return new Response(JSON.stringify({ error: "unauthorized" }), { status: 401, headers: { "Content-Type": "application/json" } });
      }
      throw redirect(303, "/logout");
    }
  }

  if (event.url.pathname.startsWith("/admin") && profile?.role !== "admin") {
    if (event.request.method !== "GET") {
      return new Response(JSON.stringify({ error: "unauthorized" }), { status: 401, headers: { "Content-Type": "application/json" } });
    }
    throw redirect(303, "/app");
  }

  if (isRouteProtected && profile?.id) {
    const { error: errorCheckin } = await checkinUser(profile.id);
    if (errorCheckin) {
      console.error(errorCheckin);
    }
  }

  return resolve(event, {
    filterSerializedResponseHeaders(name) {
      return name === 'content-range' || name === 'x-supabase-api-version'
    },
  })
}
