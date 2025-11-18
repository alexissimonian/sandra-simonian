import { AppError } from "$lib/errors/errorHandler";
import { supabaseAdminClient } from "$lib/server/db/adminClient";
import { generateProfile } from "$lib/server/services/user/userRequest";
import type { Profile } from "$lib/types";

export async function getAllProfiles(): Promise<Profile[]> {
  const { data, error } = await supabaseAdminClient.from("profiles").select("*");

  if (error) {
    console.error("Error retreiving profiles: " + error.code);
    throw new AppError("Un problème est survenu lors de la récupération des profiles", {
      redirectToErrorPage: true,
    })
  }

  let profiles = data.map(generateProfile);

  return profiles;
}
