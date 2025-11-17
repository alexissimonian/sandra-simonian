import { AppError } from "$lib/errors/errorHandler";
import { supabaseAdminClient } from "$lib/server/db/adminClient";
import type { DetailedProfileRow } from "$lib/types";

export async function getAllProfiles(): Promise<DetailedProfileRow[]> {
  const { data, error } = await supabaseAdminClient.from("detailed_profiles").select("*");

  if (error) {
    console.error("Error retreiving profiles: " + error.code);
    throw new AppError("Un problème est survenu lors de la récupération des profiles", {
      redirectToErrorPage: true,
    })
  }

  return data;
}
