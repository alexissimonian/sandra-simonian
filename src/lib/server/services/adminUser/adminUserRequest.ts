import { AppError } from "$lib/errors/errorHandler";
import { supabaseAdminClient } from "$lib/server/db/adminClient";
import type { ProfileRow } from "$lib/types";

export async function getAllProfiles(): Promise<ProfileRow[]> {
  const { data, error } = await supabaseAdminClient.from("profiles").select("*");

  if (error) {
    console.error("Error retreiving profiles: " + error.code);
    throw new AppError("Un problème est survenu lors de la récupération des profiles", {
      redirectToErrorPage: true,
    })
  }

  return data;
}
