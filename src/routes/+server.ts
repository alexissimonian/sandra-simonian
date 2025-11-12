import { redirect } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ locals }) => {
  const { session } = await locals.safeGetSession();

  if (session) {
    throw redirect(303, "/app");
  }

  throw redirect(303, "/login");
}
