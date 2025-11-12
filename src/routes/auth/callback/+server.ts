// src/routes/auth/callback/+server.ts
import { redirect } from '@sveltejs/kit'
import type { RequestHandler } from './$types'

export const GET: RequestHandler = async ({ url, locals }) => {
  const code = url.searchParams.get('code')

  if (code) {
    // Échange le code contre une session
    await locals.supabase.auth.exchangeCodeForSession(code)
  }

  // Redirige vers la page protégée
  throw redirect(303, "/login")
}
